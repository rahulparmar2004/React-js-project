import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "hover:text-yellow-400 transition";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <NavLink to="/" className="text-2xl font-bold text-yellow-400">
            🎬 MovieApp
          </NavLink>

          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className={linkStyle}>Home</NavLink>
            <NavLink to="/movies" className={linkStyle}>Movies</NavLink>
            <NavLink to="/search" className={linkStyle}>Search</NavLink>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Login
              </NavLink>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;