import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 bg-[#191A23] text-white p-4 space-x-[161px] items-center justify-between border-b border-[#E0E1EC]/30">
<nav className="flex space-x-[161px] items-center">
      <NavLink
        to="/problems"
        className="text-primary text-[24px] hover:text-primary-hover hover:font-bold"
      >
        Problems
      </NavLink>
      <NavLink
        to="/friends"
        className="text-primary text-[24px] hover:text-primary-hover hover:font-bold"
      >
        Friends
      </NavLink>
      <NavLink
        to="/about"
        className="text-primary text-[24px] hover:text-primary-hover hover:font-bold"
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        className="text-primary text-[24px] hover:text-primary-hover hover:font-bold"
      >
        Login
      </NavLink>
      <NavLink
        to="/home"
        className="text-primary text-[24px] hover:text-primary-hover hover:font-bold"
      >
        Home
      </NavLink>
      
      </nav>
    </header>
  );
};

export default Navbar;
