import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/animations.css';
import Navbar from '../components/Navbar';

// Define Problem type
interface Problem {
  id: string;
  title: string;
  difficulty: string;
}

// Define API response for paginated problems
interface PaginatedResponse {
  content: Problem[];
  totalPages: number;
  totalElements: number;
}

// TODO: This API Base URL should be an environmental variable
const API_BASE_URL = 'http://localhost:8080';

// Create a cache for paginated results (in-memory)
const problemCache = new Map<number, PaginatedResponse>();

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Pages are 1-indexed
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial page number from URL query param or default to 1
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    if (!isNaN(pageFromUrl) && pageFromUrl >= 1) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams]);

  // Fetch problems dynamically with caching
  const fetchProblems = async (page: number) => {
    // Check if the page is already cached
    if (problemCache.has(page)) {
      console.log(`✅ Using cached data for page ${page}`);
      const cachedData = problemCache.get(page);
      setProblems(cachedData!.content);
      setTotalPages(cachedData!.totalPages);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log(`📡 Fetching data from API for page ${page}`);
      const response = await fetch(
        `${API_BASE_URL}/problems?page=${page - 1}&size=10` // Backend is 0-indexed
      );

      if (!response.ok) {
        throw new Error(`Error fetching problems: ${response.status}`);
      }

      const data: PaginatedResponse = await response.json();

      // Cache the result for the current page
      problemCache.set(page, data);
      console.log(`⚡️ Cached page ${page}`);

      setProblems(data.content);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Fetch problems when currentPage changes
  useEffect(() => {
    fetchProblems(currentPage);
  }, [currentPage]);

  // Update URL with the current page
  const updateUrlWithPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // Get difficulty color dynamically
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      case 'expert':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  // Handle problem click and navigate to /workspace/{id}
  const handleProblemClick = (id: string) => {
    navigate(`/workspace/${id}`);
  };

  // Handle page change when user types a new page number
  const handlePageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(event.target.value, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updateUrlWithPage(page);
    }
  };

  // Handle Next/Previous page change
  const handlePageChange = (increment: number) => {
    const newPage = currentPage + increment;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      updateUrlWithPage(newPage);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl">
        Loading problems...
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center">
      <Navbar />
      <div className="flex min-h-screen w-full flex-col items-center p-8">
        <h1 className="mb-8 text-4xl font-bold">Problem List</h1>
        <div className="w-full max-w-4xl space-y-2">
          {/* Problem List Header */}
          <div className="bg-bg-active text-text-primary mb-2 grid grid-cols-3 gap-4 rounded-t-lg px-6 py-4 font-bold shadow-md">
            <span className="text-left">ID</span>
            <span className="text-left">Problem Name</span>
            <span className="text-center">Difficulty</span>
          </div>

          {/* Render Problem Rows */}
          {problems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => handleProblemClick(problem.id)}
              className="bg-bg-secondary border-border-primary hover:bg-bg-active grid cursor-pointer grid-cols-3 gap-4 rounded-md border-b px-6 py-2 shadow-sm transition"
            >
              {/* ID with Animation */}
              <div className="overflow-hidden text-left">
                <div className="animate-marquee-hover inline-block align-middle">
                  {problem.id}
                </div>
              </div>

              {/* Problem Name with Animation */}
              <div className="overflow-hidden text-left">
                <div className="animate-marquee-hover inline-block align-middle">
                  {problem.title}
                </div>
              </div>

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

          {/* Pagination Controls - Centered Below */}
          <div className="mt-6 flex justify-center items-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              &lt;
            </button>

            {/* Page Input */}
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={handlePageInput}
              className="w-16 rounded-md border border-gray-600 bg-bg-secondary text-center text-white outline-none"
            />

            <span className="text-white">/ {totalPages}</span>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
