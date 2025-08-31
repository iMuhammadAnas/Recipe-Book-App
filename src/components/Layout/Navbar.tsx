import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to='/' className="text-[18px] sm:text-2xl font-bold cursor-pointer">Recipe Book App</Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline sm:text-[16px] text-[13px]">
            Home
          </Link>
          <Link to="/add" className="hover:underline sm:text-[16px] text-[13px]">
            Add Recipe
          </Link>
          <button className="hover:underline cursor-pointer sm:text-[16px] text-[13px]" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;