import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/login');
    
    console.log('User logged out');
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">My todo list</p>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="text-sm text-gray-500 dark:text-white">{user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
