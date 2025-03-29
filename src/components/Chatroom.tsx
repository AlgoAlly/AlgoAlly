import { useState, useEffect, useRef } from "react";
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const Chatroom = () => {
  const [sendMessage, setSendMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageName, setMessageName] = useState("");
  const [messages, setMessages] = useState<{ [name: string]: { text: string }[] }>({});
  const stompClient = useRef<Client | null>(null); // Using `useRef` to maintain WebSocket client.

  useEffect(() => {
    // Initialize STOMP client on component mount
    const socket = new SockJS("http://localhost:8083/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        matchId: "3419c27a-a25b-4437-ad7b-7f73eb48e8ba", // Match ID
      },
      debug: (str) => console.debug("STOMP:", str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket Connected");

        // Subscribe to message topic
        client.subscribe("/topic/chatroom.3419c27a-a25b-4437-ad7b-7f73eb48e8ba", (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prev) => ({
            ...prev,
            [msg.sender]: [...(prev[msg.sender] || []), { text: msg.content }],
          }));
        });

        // Subscribe to acknowledgments
        client.subscribe("/queue/ack", (ack) => {
          const ackMsg = JSON.parse(ack.body);
          console.log("Acknowledgment:", ackMsg.message);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    stompClient.current = client;
    client.activate();

    return () => {
      client.deactivate(); // Clean up WebSocket connection on component unmount
    };
  }, []);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const openMessage = (name: string) => {
    setShowMessage(true);
    setMessages((prev) => ({
      ...prev,
      [name]: prev[name] || [],
    }));
    setMessageName(name);
  };

  const sendMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && sendMessage.trim() !== "") {
      const newMessage = { content: sendMessage.trim(), sender: messageName };

      // Update local state
      setMessages((prev) => ({
        ...prev,
        [messageName]: [...(prev[messageName] || []), { text: sendMessage }],
      }));
      setSendMessage("");

      // Publish message to the backend via WebSocket
      if (stompClient.current) {
        stompClient.current.publish({
          destination: "/app/chat.sendMessage",
          headers: { matchId: "3419c27a-a25b-4437-ad7b-7f73eb48e8ba" },
          body: JSON.stringify(newMessage),
        });
      }
    }
  };

  return (
    <div>
      <button
        onClick={toggleBox}
        className="w-80 p-2 border border-[#393A4B] text-left pl-3 rounded-sm bg-[#151621] text-white 
              focus:outline-none flex justify-between items-center cursor-pointer"
      >
        {"Message a friend"}
        <ChevronUpIcon
          className={`w-5 h-5 text-white ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="max-h-100 overflow-y-auto bg-white rounded-sm shadow-lg p-4">
          <ul>
            <li>
              <button
                className="py-2 px-4 text-black hover:bg-gray-200 rounded-md cursor-pointer"
                onClick={() => openMessage("Person 1")}
              >
                Person 1
              </button>
            </li>
            {/* Additional friends can be added similarly */}
          </ul>
          {showMessage && (
            <div className="border border-zinc-400 fixed bottom-0 right-120 p-4 w-100 h-100 rounded-xl bg-[#1f2136] flex flex-col items-center">
              <div className="flex justify-between border-b-2 pb-2 mb-4 text-white text-[20px] font-bold w-full">
                <h1>{messageName}</h1>
                <button onClick={() => setShowMessage(false)}>
                  <XMarkIcon className="w-8 h-8 cursor-pointer"></XMarkIcon>
                </button>
              </div>
              <div className="flex flex-col h-96 overflow-y-auto w-full">
                {messages[messageName]?.map((msg, index) => (
                  <div key={index} className="flex items-start justify-end mb-4 mr-4">
                    <div className="bg-blue-400 text-black rounded-lg p-3 shadow-sm">{msg.text}</div>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                onKeyDown={sendMessageHandler}
                placeholder="Send A Message"
                className="w-80 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black] mt-auto"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatroom;
