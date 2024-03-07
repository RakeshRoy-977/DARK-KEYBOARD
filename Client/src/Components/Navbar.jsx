import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" shadow-lg">
      <div className="mx-auto px-4 py-2 max-w-screen-xl flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className=" font-bold">
            DARK KEYBOARD
          </Link>
        </div>
        <div className="hidden md:flex md:space-x-4">
          <Link to="/Ranking" className="">
            Top Ranking
          </Link>
          <Link to="/SumitJokes" className="">
            Submit Joke
          </Link>
          <Link to="/ContactUsPage" className="">
            Contact Us
          </Link>
        </div>
        <div className="hidden md:flex md:space-x-4">
          <Link
            to="/login"
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
          >
            Signup
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/Ranking"
              className="block px-3 py-2  rounded-md hover:bg-gray-700"
            >
              Top Ranking
            </Link>
            <Link
              to="/SumitJokes"
              className="block px-3 py-2  rounded-md hover:bg-gray-700"
            >
              Submit Joke
            </Link>
            <Link
              to="/ContactUsPage"
              className="block px-3 py-2  rounded-md hover:bg-gray-700"
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2  rounded-md hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2  rounded-md hover:bg-gray-700"
            >
              SignUp
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
