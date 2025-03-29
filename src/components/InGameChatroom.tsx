import { useState } from "react";
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";

const InGameChatroom = () => {
    const [sendMessage, setSendMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string }[]>([]);

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    const checkClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && sendMessage.trim() !== "") {
            setMessages((prev) => [...prev, { text: sendMessage }]);
            setSendMessage("");
        }
    };

    return (
        <div>
            <button
                onClick={toggleBox}
                className="w-100 p-2 border border-[#393A4B] text-left pl-3 rounded-sm bg-[#151621] text-white focus:outline-none flex justify-between items-center cursor-pointer"
            >
                {"Message a friend"}
                <ChevronUpIcon
                    className={`w-5 h-5 text-white ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {isOpen && (
                <div className="h-100 border border-zinc-400 bg-[#1f2136] rounded-sm shadow-lg p-4 flex flex-col items-center">
                    <div className="flex justify-between border-b-2 pb-2 mb-4 text-white text-[20px] font-bold w-full">
                        <h1>Chatroom</h1>
                        <button onClick={() => setIsOpen(false)}>
                            <XMarkIcon className='w-8 h-8 cursor-pointer' />
                        </button>
                    </div>
                    <div className='flex flex-col h-96 overflow-y-auto w-full'>
                        {messages.map((msg, index) => (
                            <div key={index} className="flex items-start justify-end mb-4 mr-4">
                                <div className="bg-blue-400 text-black rounded-lg p-3 shadow-sm">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                        onKeyDown={(e) => checkClick(e)}
                        placeholder="Send A Message"
                        className="w-80 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black] mt-auto"
                    />
                </div>
            )}
        </div>
    );
};

export default InGameChatroom;