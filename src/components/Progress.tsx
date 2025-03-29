import { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const Progress = () => {
  const [hoveredEasy, setHoveredEasy] = useState(false);
  const [hoveredMedium, setHoveredMedium] = useState(false);
  const [hoveredHard, setHoveredHard] = useState(false);

  return (
    <div className="">
      <h1 className="text-center text-[30px] text-white"> Your Progress </h1>
      <div
        className="mb-4 w-96"
        onMouseEnter={() => setHoveredEasy(true)}
        onMouseLeave={() => setHoveredEasy(false)}
      >
        <p className="pb-1.5 text-white"> Easy: </p>
        <ProgressBar
          completed={80}
          animateOnRender={true}
          bgColor="#31c431"
          height="25px"
          className="rounded-2xl border-[2.5px] border-zinc-400"
        ></ProgressBar>
        {hoveredEasy && (
          <div className="mt-1 rounded-lg bg-gray-800 p-2 text-white">
            30/100 problems solved
          </div>
        )}
      </div>
      <div
        className="mb-4 w-96"
        onMouseEnter={() => setHoveredMedium(true)}
        onMouseLeave={() => setHoveredMedium(false)}
      >
        <p className="pb-1.5 text-white"> Medium: </p>
        <ProgressBar
          completed={80}
          animateOnRender={true}
          bgColor="#dec927"
          height="25px"
          className="rounded-2xl border-[2.5px] border-zinc-400"
        ></ProgressBar>
        {hoveredMedium && (
          <div className="mt-1 rounded-lg bg-gray-800 p-2 text-white">
            30/100 problems solved
          </div>
        )}
      </div>
      <div
        className="left-300 mb-4 w-96"
        onMouseEnter={() => setHoveredHard(true)}
        onMouseLeave={() => setHoveredHard(false)} // When mouse leaves, set hovered to false>
      >
        <p className="pb-1.5 text-white"> Hard: </p>
        <ProgressBar
          completed={80}
          animateOnRender={true}
          bgColor="#a20202"
          height="25px"
          className="rounded-2xl border-[2.5px] border-zinc-400"
        ></ProgressBar>
        {hoveredHard && (
          <div className="mt-1 rounded-lg bg-gray-800 p-2 text-white">
            30/100 problems solved
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
