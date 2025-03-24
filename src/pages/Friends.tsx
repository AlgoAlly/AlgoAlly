import "react";
import Progress from '../components/Progress'
import Navbar from "../components/Navbar";
import Chatroom from "../components/Chatroom";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Button from '../components/Button';

const Friends = () => {

const problems = [
  { id: 1, name: "John Doe", difficulty: "Online", solveRate: "422" },
  { id: 1, name: "John Doe", difficulty: "Online", solveRate: "422" },
  { id: 1, name: "John Doe", difficulty: "Online", solveRate: "422" },
];

  return (<div className='bg-[#191A23] min-h-screen'>
          <Navbar/>
          
          <div className="min-h-screen flex flex-col items-center p-8">
          <h1 className="text-4xl font-bold mb-8 mt-8">Friends Page</h1>
          <div className="w-full max-w-4xl space-y-2">
            {/* Problem List Header */}
            <div className="grid grid-cols-3 gap-6 px-6 py-4 bg-bg-active rounded-t-lg shadow-md font-bold mb-2 text-text-primary w-full">
            <button className="relative text-center cursor-pointer font-bold hover:font-bold after:content-[''] after:absolute after:left-0 after:w-full after:h-[3px] after:bg-transparent after:bottom-[-14px] hover:after:bg-white">
  Friends
</button>
  <button className="relative text-center after:content-[''] cursor-pointer after:absolute after:left-0 after:w-full after:h-1 after:bg-transparent after:bottom-[-14px] hover:after:bg-white">
    Friend Requests
  </button>
  <button className="relative text-center after:content-[''] cursor-pointer after:absolute after:left-0 after:w-full after:h-1 after:bg-transparent after:bottom-[-14px] hover:after:bg-white">
    Search For A Friend
  </button>
</div>
<h2 className="text-3xl font-bold mb-6 mt-6">Your Friends List:</h2>
<div
            
            className="grid grid-cols-4 px-6 py-2 border-b-4 bg-bg-secondary border-b border-border-primary hover:bg-bg-active"
          >
            {/* ID */}
            <span className="text-left">{"Profile Picture"}</span>

            {/* Problem Name with Scrollinng Animation */}
            <span className="text-left">{"Name"}</span>

            {/* Solve Rate */}
            <span className="text-center pl-20">{"Status"}</span>
            <span className="text-center">{"Rank Points"}</span>


          </div>
    {problems.map((problem) => (
          <div
            key={problem.id}
            className="grid grid-cols-4 px-6 py-6 bg-bg-secondary border-b border-border-primary hover:bg-bg-active"
          >
            <span className="text-left pl-12">{problem.id}</span>

{/* Problem Name with Scrolling Animation */}
<span className="text-left">{problem.name}</span>

{/* Solve Rate */}
<span className="text-center pl-20">{problem.difficulty}</span>
<span className="text-center">{problem.solveRate}</span>




          </div>
        ))}

            </div>
            </div>
            </div>

  );
}

export default Friends;
