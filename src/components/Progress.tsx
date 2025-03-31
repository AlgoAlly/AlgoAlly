
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const Progress = ( { username }) => {
    const [hoveredEasy, setHoveredEasy] = useState(false);
    const [hoveredMedium, setHoveredMedium] = useState(false);
    const [hoveredHard, setHoveredHard] = useState(false);

    return (
        <div className="border border-zinc-400 p-4 rounded-xl bg-[#1f2136]">
            <h1 className="text-center text-white text-[30px]"> {username}'s Progress </h1>
            <div className="mb-4 w-96" 
                onMouseEnter={() => setHoveredEasy(true)}
                onMouseLeave={() => setHoveredEasy(false)}
                            > 
                <p className="text-white pb-1.5"> Easy: </p>
                <ProgressBar completed={80} animateOnRender={true}  bgColor="#31c431" height="25px" className="border-[2.5px] border-zinc-400 rounded-2xl "></ProgressBar>
                {hoveredEasy && (
                    <div className="bg-gray-800 text-white p-2 rounded-lg mt-1">
                        30/100 problems solved
                    </div>
                )}
            </div>
            <div className="mb-4 w-96"                            
                onMouseEnter={() => setHoveredMedium(true)}
                onMouseLeave={() => setHoveredMedium(false)}
                            > 
                <p className="text-white pb-1.5"> Medium: </p>
                <ProgressBar completed={80} animateOnRender={true} bgColor="#dec927" height="25px" className="border-[2.5px] border-zinc-400 rounded-2xl"></ProgressBar>
                {hoveredMedium && (
                    <div className="bg-gray-800 text-white p-2 rounded-lg mt-1">
                        30/100 problems solved
                    </div>
                )}
            </div>
            <div className="mb-4 left-300 w-96"  
                onMouseEnter={() => setHoveredHard(true)}
                onMouseLeave={() => setHoveredHard(false)} // When mouse leaves, set hovered to false>
                            >  
                <p className="text-white pb-1.5"> Hard: </p>
                <ProgressBar completed={80} animateOnRender={true} bgColor="#a20202" height="25px" className="border-[2.5px] border-zinc-400 rounded-2xl"></ProgressBar>
                {hoveredHard && (
                    <div className="bg-gray-800 text-white p-2 rounded-lg mt-1">
                        30/100 problems solved
                    </div>
                )}
            </div>
        </div>
    )
}

export default Progress;
