import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token= localStorage.getItem('token')
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-5 text-white">
      <Link to="/dashboard" className="text-2xl">
        Car Manager
      </Link>
      <div className="flex gap-5">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create">Add New Car</Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            <Link to={'/login'}> SignIn</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
