import { useState } from "react";

const Inputs = () => {
  const [input, setInput] = useState("");

  return (
    <div>
    <div className="absolute top-54.5 left-80">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="First Name"
        className="w-64 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-54.5 left-150">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Last Name"
        className="w-64 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-72 left-80">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Email"
        className="w-134 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-91.5 left-80">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Username"
        className="w-134 p-2 border border-[#393A4B] rounded-lg placeholder-[#EEEFFC] placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
</div>
    
  );
};

export default Inputs;