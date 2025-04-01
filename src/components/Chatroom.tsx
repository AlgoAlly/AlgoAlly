// import { useState, useEffect, useRef } from "react";
// import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import SockJS from "sockjs-client";
// import { Client, IMessage } from "@stomp/stompjs";

// interface ChatMessage {
//   sender: string;
//   content: string;
// }

// const Chatroom = () => {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isOpen, setIsOpen] = useState(true); // Start with open state for visibility
//   const [showChat, setShowChat] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const stompClientRef = useRef<Client | null>(null);
//   const matchId = "3419c27a-a25b-4437-ad7b-7f73eb48e8ba";

//   useEffect(() => {
//     try {
//       const sockJS = new SockJS('http://100.86.210.52:8083/ws');
//       const client = new Client({
//         webSocketFactory: () => sockJS,
//         connectHeaders: { matchId },
//         reconnectDelay: 5000,
//         onConnect: () => {
//           client.subscribe(`/topic/chatroom.${matchId}`, (message: IMessage) => {
//             try {
//               const msg: ChatMessage = JSON.parse(message.body);
//               setMessages(prev => [...prev, msg]);
//             } catch (e) {
//               console.error('Message parse error:', e);
//             }
//           });

//           // Fetch chat history
//           fetch(`http://100.86.210.52:8083/chat/history/${matchId}`)
//             .then(response => {
//               if (!response.ok) throw new Error('Failed to fetch history');
//               return response.json();
//             })
//             .then(history => setMessages(history))
//             .catch(error => console.error('History fetch error:', error));
//         },
//         onStompError: (frame) => {
//           console.error('STOMP Error:', frame.headers?.message);
//         },
//         onWebSocketError: (error) => {
//           console.error('WebSocket Error:', error);
//         }
//       });

//       client.activate();
//       stompClientRef.current = client;

//       return () => {
//         client.deactivate();
//       };
//     } catch (error) {
//       console.error('Initialization error:', error);
//     }
//   }, [matchId]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim() && stompClientRef.current?.connected) {
//       const message = {
//         content: inputMessage,
//         sender: "currentUser" // Replace with actual username
//       };

//       stompClientRef.current.publish({
//         destination: '/app/chat.sendMessage',
//         headers: { matchId },
//         body: JSON.stringify(message)
//       });

//       setInputMessage("");
//     }
//   };

//   return (
//     <div className="relative m-4"> {/* Added margin for visibility */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-80 p-2 border border-[#393A4B] text-left pl-3 rounded-sm bg-[#151621] text-white
//                   focus:outline-none flex justify-between items-center cursor-pointer"
//       >
//         Message a friend
//         <ChevronUpIcon
//           className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//         />
//       </button>

//       {isOpen && (
//         <div className="mt-2 bg-white rounded-sm shadow-lg p-4">
//           <button
//             onClick={() => setShowChat(true)}
//             className="py-2 px-4 text-black hover:bg-gray-200 rounded-md"
//           >
//             Open Group Chat
//           </button>

//           {showChat && (
//             <div className="fixed bottom-20 right-4 w-96 bg-[#1f2136] rounded-lg shadow-xl p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-white text-xl font-bold">Group Chat</h2>
//                 <button
//                   onClick={() => setShowChat(false)}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <XMarkIcon className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="h-64 overflow-y-auto mb-4">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={`msg-${index}`}
//                     className={`mb-2 ${msg.sender === "currentUser" ? 'text-right' : 'text-left'}`}
//                   >
//                     <div
//                       className={`inline-block p-2 rounded-lg ${
//                         msg.sender === "currentUser"
//                           ? 'bg-blue-600 text-white'
//                           : 'bg-gray-700 text-white'
//                       }`}
//                     >
//                       <span className="text-sm font-semibold">{msg.sender}</span>
//                       <p className="mt-1">{msg.content}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   placeholder="Type a message..."
//                   className="flex-1 p-2 bg-[#151621] text-white rounded-lg border border-[#393A4B] focus:outline-none"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatroom;
