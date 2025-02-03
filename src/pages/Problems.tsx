import React from "react";
import "../styles/animations.css";

const problems = [
  { id: 1, name: "Two Sum", difficulty: "Easy", solveRate: "63.9%" },
  { id: 2, name: "Add Two Numbers", difficulty: "Medium", solveRate: "54.8%" },
  { id: 3, name: "Longest Substring Without Repeating Characters", difficulty: "Medium", solveRate: "45.2%" },
  { id: 4, name: "Median of Two Sorted Arrays", difficulty: "Hard", solveRate: "36.1%" },
  { id: 5, name: "Longest Palindromic Substring", difficulty: "Medium", solveRate: "42.6%" },
];

const ProblemList: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Problem List</h1>
      <div className="w-full max-w-4xl space-y-2">
        {/* Problem List Header */}
        <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-800 rounded-t-lg shadow-md font-bold text-gray-300 mb-2">
          <span className="text-left">ID</span>
          <span className="text-left">Problem Name</span>
          <span className="text-center">Solve Rate</span>
          <span className="text-center">Difficulty</span>
        </div>
        {/* Problem Rows */}
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="grid grid-cols-4 gap-4 px-6 py-2 bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition rounded-md shadow-sm"
          >
            {/* ID */}
            <span className="text-left text-gray-300">{problem.id}.</span>

            {/* Problem Name with Scrolling Animation */}
            <div className="text-left text-gray-200 overflow-hidden">
              <div className="inline-block animate-marquee-hover">
                {problem.name}
              </div>
            </div>

            {/* Solve Rate */}
            <span className="text-center text-purple-400">{problem.solveRate}</span>

            {/* Difficulty */}
            <span
              className={`text-center font-bold ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
