import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ChatMessage {
  sender: string;
  content: string;
  timestamp: string; // ISO date string (or you can store a Date)
}

const InGameChatroom = () => {
  const [sendMessageText, setSendMessageText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<Client | null>(null);

  // Toggle the chatbox open/closed.
  const toggleBox = () => {
    setIsOpen(!isOpen);
};

  // Handle Enter key to send messages.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && sendMessageText.trim() !== "") {
      sendMessage();
    }
  };

  async function fetchChatHistory() {
    try {
      const response = await fetch(
        "/chat/history/3419c27a-a25b-4437-ad7b-7f73eb48e8ba",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include JWT
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
  
      const history: ChatMessage[] = await response.json();
      setMessages(history);
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }
  

  // Publish the message to the backend.
  const sendMessage = () => {
    if (!clientRef.current) return;

    const message = {
      content: sendMessageText,
      sender: localStorage.getItem('username'),
      timestamp: new Date().toISOString(),
    };

    clientRef.current.publish({
      destination: "/app/chat.sendMessage",
      headers: { matchId: "3419c27a-a25b-4437-ad7b-7f73eb48e8ba",
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
       },
      body: JSON.stringify(message),
    });

    setSendMessageText("");
  };

  
  useEffect(() => {
    // Create the STOMP client with SockJS as the underlying transport.
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8083/ws"),
      connectHeaders: { matchId: "3419c27a-a25b-4437-ad7b-7f73eb48e8ba",
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
       },
      debug: (str) => console.debug("STOMP:", str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("WebSocket Connected");

      // Subscribe to new chat messages.
      client.subscribe(
        "/topic/chatroom.3419c27a-a25b-4437-ad7b-7f73eb48e8ba",
        (message) => {
          try {
            const msg: ChatMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, msg]);
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        }
        
      );

      // Subscribe to acknowledgements (if needed).
      client.subscribe("/queue/ack", (message) => {
        try {
          const ackMsg = JSON.parse(message.body);
          console.log("Acknowledgement:", ackMsg);
          // You can show an in-app notification temporarily if desired.
        } catch (error) {
          console.error("Error parsing ack:", error);
        }
      });

      fetchChatHistory();

    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket Error:", error);
      // Optionally, update a state variable to display an error message.
    };

    client.onStompError = (frame) => {
      console.error("STOMP Error:", frame.headers.message);
      // Optionally handle protocol errors.
    };

    client.activate();
    clientRef.current = client;

    // Cleanup on unmount: deactivate the client.
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  return (
    <div>
      <button
        onClick={toggleBox}
        className="w-100 p-2 border border-[#393A4B] text-left pl-3 rounded-sm bg-[#151621] text-white focus:outline-none flex justify-between items-center cursor-pointer"
      >
        {isOpen ? "Close Chatroom" : "Open Chatroom"}
        <ChevronUpIcon
          className={`w-5 h-5 text-white ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="h-100 border border-zinc-400 bg-[#1f2136] rounded-sm shadow-lg p-4 flex flex-col items-center">
          <div className="flex justify-between border-b-2 pb-2 mb-4 text-white text-[20px] font-bold w-full">
            <h1>Chatroom</h1>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-8 h-8 cursor-pointer" />
            </button>
          </div>
          <div
            id="chatMessages"
            className="flex flex-col h-96 overflow-y-auto w-full"
          >
{messages.map((msg, index) => (
  <div 
    key={index} 
    className={`mb-4 ${msg.sender === "currentUser" ? 'text-right' : 'text-left'}`}
  >
    <div className={`inline-block p-3 rounded-lg shadow-sm ${
      msg.sender === "currentUser" 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-700 text-white'
    }`}>
      <span className="text-sm font-semibold">{msg.sender}</span>
      <p className="mt-1">{msg.content}</p>
    </div>
    <small className={`block mt-1 text-gray-300 ${
      msg.sender === "currentUser" ? 'text-right' : 'text-left'
    }`}>
      {new Date(msg.timestamp).toLocaleTimeString()}
    </small>
  </div>
))}

            
          </div>
          <input
            type="text"
            value={sendMessageText}
            onChange={(e) => setSendMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send A Message"
            className="w-80 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black] mt-auto"
          />
        </div>
      )}
    </div>
  );
};

export default InGameChatroom;
