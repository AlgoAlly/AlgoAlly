import { SetStateAction, useState } from "react";
import Navbar from "../components/Navbar";
import Progress from "../components/Progress";
import Button from "../components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
  const [friendList, setFriendList] = useState(true);
  const [requestList, setRequestList] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const [profileName, setProfileName] = useState("");
  const itemsPerPage = 5;

  const totalPages = Math.ceil(problems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openFriendsPage = () => {
    setFriendList(true);
    setRequestList(false);
    setSearchList(false);
    setPopUp(false);
  }

  const openRequestsPage = () => {
    setFriendList(false);
    setRequestList(true);
    setSearchList(false);   
    setPopUp(false);
  }

  const openSearchPage = () => {
    setFriendList(false);
    setRequestList(false);
    setSearchList(true);   
    setPopUp(false);
  }

  const openPopUp = ( username: string ) => {
    setPopUp(!popUp);
    setProfileName(username);
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
            <button className="relative text-center cursor-pointer"
            onClick={() => openFriendsPage()}>
              Friends
            </button>
            <button className="relative text-center cursor-pointer"
            onClick={() => openRequestsPage()}>
              Friend Requests
            </button>
            <button className="relative text-center cursor-pointer"
            onClick={() => openSearchPage()}>
              Search For A Friend
            </button>
          </div>
          {friendList && (
          <div>  
          <h2 className="text-3xl text-ce font-bold mb-6 mt-6">Your Friends List:</h2>
          <div className="grid grid-cols-2 px-6 py-2 border-b-4 bg-bg-secondary border-b border-border-primary hover:bg-bg-active">
            <span className="text-center pr-20">{"Name"}</span>

          </div>

          {getCurrentPageItems().map((problem) => (
            <button
              key={problem.id}
              className="grid grid-cols-2 px-6 py-6 w-224 bg-bg-secondary border-b border-border-primary hover:bg-bg-active cursor-pointer"
            onClick={() => openPopUp( problem.name )}
            >
              

              <span className="text-center pr-20">{problem.name}</span>
              <h1> Click to see {problem.name}'s stats!</h1>
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
      <Progress username={profileName} />
      <button 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={() => setPopUp(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
</div> 
          )} 
  {requestList && (
          <div>  
          <h2 className="text-3xl text-ce font-bold mb-6 mt-6">Incoming Friend Requests:</h2>
          <div className="grid grid-cols-2 px-6 py-2 border-b-4 bg-bg-secondary border-b border-border-primary hover:bg-bg-active">
            <span className="text-center pr-20">{"Name"}</span>
            <span className="text-center">{"Accept/Decline"}</span>
          </div>

          {getCurrentPageItems().map((problem) => (
            <div
              key={problem.id}
              className="grid grid-cols-2 px-6 py-4 w-224 bg-bg-secondary border-b border-border-primary"
            >
              

              <span className="text-center pr-20 self-center">{problem.name}</span>
              <div className="text-center">
              <Button
            className="h-10 w-18 mr-6"
            variant="secondary"
          >
            Accept
          </Button>
            <button className="bg-bg-active
                     active:ring-border-secondary
                     border-border-primary
                     active:bg-button-primary-active
                     hover:bg-button-primary-hover h-10 inline-flex items-center
                      justify-center px-4 leading-5 transition-all duration-150 rounded-md
                       active:duration-50 active:ring-1 border-1">
                      Reject
                     </button>
              </div>
            </div>
          ))}
            </div>
          
  )}

{searchList && (
  <div> 
  <h2 className="text-3xl text-ce font-bold mb-4 mt-6">Search For A User:</h2>
  <div className="relative w-full mb-4">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <MagnifyingGlassIcon className="h-5 w-5" />
    </div>
    <input
      type="text"
      placeholder="Search By Username"
      className="w-full p-2 pl-10 border border-[#393A4B] rounded-lg placeholder-text-secondary placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"  
    />
  </div>

          {getCurrentPageItems().map((problem) => (
            <div
              key={problem.id}
              className="grid grid-cols-2 px-6 py-4 w-224 bg-bg-secondary border-b border-border-primary"
            >
              

              <span className="text-center pr-20 self-center">{problem.name}</span>
              <div className="text-center">
              <Button
            className="h-10 w-18"
            variant="secondary"
          >
            Send
          </Button>
              </div>
            </div>
          ))}
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
