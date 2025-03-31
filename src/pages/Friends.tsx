import { useState } from "react";
import Navbar from "../components/Navbar";
import Progress from "../components/Progress";

const Friends = () => {
  const problems = [
    { id: 1, name: "John Doe", difficulty: "Online", solveRate: "422" },
    { id: 2, name: "Jane Smith", difficulty: "Offline", solveRate: "350" },
    { id: 3, name: "Alice Johnson", difficulty: "Online", solveRate: "200" },
    { id: 4, name: "Bob Brown", difficulty: "Offline", solveRate: "500" },
    { id: 5, name: "Emma Davis", difficulty: "Online", solveRate: "300" },
    { id: 6, name: "Michael Wilson", difficulty: "Offline", solveRate: "450" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(problems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openPopUp = () => {
    setPopUp(!popUp);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return problems.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-[#191A23] min-h-screen">
      <Navbar />

      <div className="min-h-screen flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-8 mt-8">Friends Page</h1>
        <div className="w-full max-w-4xl space-y-2">
          <div className="grid grid-cols-3 gap-6 px-6 py-4 bg-bg-active rounded-t-lg shadow-md font-bold mb-2 text-text-primary w-full">
            <button className="relative text-center font-bold hover:font-bold">
              Friends
            </button>
            <button className="relative text-center cursor-pointer">
              Friend Requests
            </button>
            <button className="relative text-center cursor-pointer">
              Search For A Friend
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-6 mt-6">Your Friends List:</h2>
          <div className="grid grid-cols-4 px-6 py-2 border-b-4 bg-bg-secondary border-b border-border-primary hover:bg-bg-active">
            <span className="text-left">{"Profile Picture"}</span>
            <span className="text-left">{"Name"}</span>
            <span className="text-center pl-20">{"Status"}</span>
            <span className="text-center">{"Rank Points"}</span>
          </div>

          {getCurrentPageItems().map((problem) => (
            <button
              key={problem.id}
              className="grid grid-cols-4 px-6 py-6 w-224 bg-bg-secondary border-b border-border-primary hover:bg-bg-active cursor-pointer"
            onClick={() => openPopUp()}
            >
              
              <span className="text-left pl-12">{problem.id}</span>
              <span className="text-left">{problem.name}</span>
              <span className="text-center pl-20">{problem.difficulty}</span>
              <span className="text-center">{problem.solveRate}</span>
            </button>
          ))}
{popUp && (
  <div 
  className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
  style={{
    backdropFilter: "blur(10px)", // Blur everything behind
  }}
  onClick={() => setPopUp(false)}
  >
    <div 
      className="w-fit p-6 bg-[#1f2136] rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
    >
      <Progress username="persons" />
      <button 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={() => setPopUp(false)}
      >
        Close
      </button>
    </div>
  </div>
)}



          

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-bg-active rounded-md shadow-md text-white disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-bg-active rounded-md shadow-md text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
