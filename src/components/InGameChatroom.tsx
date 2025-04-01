import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

interface ChatMessage {
  sender: string;
  content: string;
  timestamp: string; // ISO date string
}

interface InGameChatroomProps {
  chatroomId: string;
}

const InGameChatroom = ({ chatroomId }: InGameChatroomProps) => {
  const [sendMessageText, setSendMessageText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<Client | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && sendMessageText.trim() !== '') {
      sendMessage();
    }
  };

  // async function fetchChatHistory() {
  //   try {
  //     const response = await fetch(`http://100.86.210.52:8083/chat/history/${chatroomId}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch chat history");
  //     }

  //     const history: ChatMessage[] = await response.json();
  //     setMessages(history);
  //   } catch (e) {
  //     console.error("Failed to load chat history:", e);
  //   }
  // }

  const sendMessage = () => {
    if (!clientRef.current) return;

    const message = {
      content: sendMessageText,
      sender: localStorage.getItem('username'),
      timestamp: new Date().toISOString(),
    };

    clientRef.current.publish({
      destination: '/app/chat.sendMessage',
      headers: {
        matchId: chatroomId,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(message),
    });

    setSendMessageText('');
  };

  useEffect(() => {
    const host = import.meta.env.VITE_CHAT_API_HOST || 'http://100.86.210.52';
    const port = import.meta.env.VITE_CHAT_API_PORT || '8083';
    const client = new Client({
      webSocketFactory: () => new SockJS(`${host}:${port}/ws`),
      connectHeaders: {
        matchId: chatroomId,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      debug: (str) => console.debug('STOMP:', str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('WebSocket Connected');

      client.subscribe(`/topic/chatroom.${chatroomId}`, (message) => {
        try {
          const msg: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, msg]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      client.subscribe('/queue/ack', (message) => {
        try {
          const ackMsg = JSON.parse(message.body);
          console.log('Acknowledgement:', ackMsg);
        } catch (error) {
          console.error('Error parsing ack:', error);
        }
      });

      // fetchChatHistory();
    };

    client.onWebSocketError = (error) => {
      console.error('WebSocket Error:', error);
    };

    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers.message);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [chatroomId]); // Reconnect when chatroomId changes

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      <button
        onClick={toggleBox}
        className="border-border-primary bg-bg-active flex w-100 cursor-pointer items-center justify-between rounded-sm border p-2 pl-3 text-left text-white focus:outline-none"
      >
        {isOpen ? 'Close Chatroom' : 'Open Chatroom'}
        <ChevronUpIcon
          className={`ml-2 h-5 w-5 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div className="flex h-100 flex-col items-center rounded-sm border border-zinc-400 bg-[#1f2136] p-4 shadow-lg">
          <div className="mb-4 flex w-full justify-between border-b-2 pb-2 text-[20px] font-bold text-white">
            <h1>Chatroom</h1>
          </div>
          <div
            id="chatMessages"
            className="flex h-96 w-full flex-col overflow-y-auto"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`mb-4 ${msg.sender === localStorage.getItem('username') ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block rounded-lg p-3 shadow-sm ${msg.sender === localStorage.getItem('username') ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
                >
                  <span className="text-sm font-semibold">{msg.sender}</span>
                  <p className="mt-1">{msg.content}</p>
                </div>
                <small
                  className={`mt-1 block text-gray-300 ${msg.sender === localStorage.getItem('username') ? 'text-right' : 'text-left'}`}
                >
                  {new Date(msg.timestamp).toLocaleString()}
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
            className="mt-auto w-80 rounded-lg border border-[#393A4B] bg-[#151621] p-2 text-white placeholder-[#EEEFFC] caret-white placeholder:text-[15px] focus:border-[#393A4B] focus:shadow-[0_0_0_2px_black] focus:outline-none focus:placeholder:opacity-0"
          />
        </div>
      )}
    </div>
  );
};

export default InGameChatroom;
