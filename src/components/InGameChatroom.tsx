
import { useState } from "react";
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";


const InGameChatroom = () => {

    const [sendMessage, setsendMessage] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageName, setMessageName] = useState("");
    const [messages, setMessages] = useState<{ [name: string]: { text: string;}[] }>({});

    const toggleBox = () => {
        setIsOpen(!isOpen);
      };
    
      const openMessage = (name: string) => {
        setShowMessage(true);
        setMessages((prev) => ({
          ...prev,
          [name]: prev[name] || []
        }));
        setMessageName(name);
      }

      const checkClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && sendMessage.trim() !== "") {
          setMessages((prev) => ({
            ...prev,
            [messageName]: [...(prev[messageName] || []), { text: sendMessage }]
          }));
          setsendMessage("")
      } 
    }

      return(
    <div>


  <button
    onClick={toggleBox}
    className="w-80 p-2 border border-[#393A4B] text-left pl-3 rounded-sm bg-[#151621] text-white 
              focus:outline-none flex justify-between items-center cursor-pointer"
  >
    {"Message a friend"}
    <ChevronUpIcon
      className={`w-5 h-5 text-white ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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
        <li>
      <button
          className="py-2 px-4 text-black hover:bg-gray-200 rounded-md cursor-pointer" 
          onClick={() => openMessage("Person 2")}
        >
          Person 2
        </button>
        </li>
        <li>
      <button
          className="py-2 px-4 text-black hover:bg-gray-200 rounded-md cursor-pointer" 
          onClick={() => openMessage("Person 3")}
        >
          Person 3
        </button>
        </li>
        <li>
      <button
          className="py-2 px-4 text-black hover:bg-gray-200 rounded-md cursor-pointer" 
          onClick={() => openMessage("Person 4")}
        >
          Person 4
        </button>
        </li>
        <li>
      <button
          className="py-2 px-4 text-black hover:bg-gray-200 rounded-md cursor-pointer" 
          onClick={() => openMessage("Person 5")}
        >
          Person 5
        </button>
        </li>
      </ul>
      {showMessage && (
      <div className="border border-zinc-400 fixed bottom-0 right-120 p-4 w-100 h-100 rounded-xl bg-[#1f2136] flex flex-col items-center">
      <div className="flex justify-between border-b-2 pb-2 mb-4 text-white text-[20px] font-bold w-full">
    <h1 >{messageName}</h1>
    <button onClick={() => setShowMessage(false)}>
      <XMarkIcon className='w-8 h-8 cursor-pointer'></XMarkIcon>
      </button>
      </div>
      <div className='flex flex-col h-96 overflow-y-auto w-full'>
        {/* <div className='flex items-start justify-start mt-4 ml-4'>
      <div className='bg-gray-400 rounded-lg p-3 shadow-sm'>
        Hello
      </div>
      </div> */}
      {messages[messageName].map(msg => (
        <div className="flex items-start justify-end mb-4 mr-4">
          <div className="bg-blue-400 text-black rounded-lg p-3 shadow-sm">
            {msg.text}
          </div>
        </div>
      ))}
      </div>
    <input
      type="text"
      value={sendMessage}
      onChange={(e) => setsendMessage(e.target.value)}
      onKeyDown={(e) => checkClick(e)}
      placeholder="Send A Message"
      className="w-80 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black] mt-auto"
    />
  </div>

    )}

    </div>
  )}
</div>
)}

export default InGameChatroom;