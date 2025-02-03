import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 bg-[#191A23] text-white p-4 space-x-[161px] items-center justify-between border-b border-[#E0E1EC]/30">
<nav className="flex space-x-[161px] pl-30 items-center">
      <NavLink
        to="/problems"
        className="text-[#EEEFFC] text-[24px] hover:text-blue-500 hover:font-bold"
      >
        Problems
      </NavLink>
      <NavLink
        to="/friends"
        className="text-[#EEEFFC] text-[24px] hover:text-blue-500 hover:font-bold"
      >
        Friends
      </NavLink>
      <NavLink
        to="/about"
        className="text-[#EEEFFC] text-[24px] hover:text-blue-500 hover:font-bold"
      >
        About
      </NavLink>
      <NavLink
        to="/home"
        className="text-[#EEEFFC] text-[24px] hover:text-blue-500 hover:font-bold"
      >
        Home
      </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
