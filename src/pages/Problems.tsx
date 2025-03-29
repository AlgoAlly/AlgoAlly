import React from 'react';
import '../styles/animations.css';
import Navbar from '../components/Navbar';

const problems = [
  { id: 1, name: 'Two Sum', difficulty: 'Easy', solveRate: '63.9%' },
  { id: 2, name: 'Add Two Numbers', difficulty: 'Medium', solveRate: '54.8%' },
  {
    id: 3,
    name: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    solveRate: '45.2%',
  },
  {
    id: 4,
    name: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    solveRate: '36.1%',
  },
  {
    id: 5,
    name: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    solveRate: '42.6%',
  },
];

const ProblemList: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <Navbar />
      <div className="flex min-h-screen w-full flex-col items-center p-8">
        <h1 className="mb-8 text-4xl font-bold">Problem List</h1>
        <div className="w-full max-w-4xl space-y-2">
          {/* Problem List Header */}
          <div className="bg-bg-active text-text-primary mb-2 grid grid-cols-4 gap-4 rounded-t-lg px-6 py-4 font-bold shadow-md">
            <span className="text-left">ID</span>
            <span className="text-left">Problem Name</span>
            <span className="text-center">Solve Rate</span>
            <span className="text-center">Difficulty</span>
          </div>
          {/* Problem Rows */}
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-bg-secondary border-border-primary hover:bg-bg-active grid grid-cols-4 gap-4 rounded-md border-b px-6 py-2 shadow-sm transition"
            >
              {/* ID */}
              <span className="text-left">{problem.id}.</span>

              {/* Problem Name with Scrolling Animation */}
              <div className="overflow-hidden text-left">
                <div className="animate-marquee-hover inline-block align-middle">
                  {problem.name}
                </div>
              </div>

              {/* Solve Rate */}
              <span className="text-center text-purple-400">
                {problem.solveRate}
              </span>

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
    </div>
  );
};

export default ProblemList;
