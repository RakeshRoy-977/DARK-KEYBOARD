import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "../Store/isLoggedInSlice";

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handelLogout = () => {
    // Remove token from cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
  };

  const renderLoginLogoutButton = () => {
    if (isLoggedIn) {
      return (
        <div className="hidden sm:flex">
          <Link
            to="/"
            onClick={handelLogout}
            className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
          >
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <>
          <Link
            to="/login"
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
          >
            Login
          </Link>
          <div className="hidden sm:flex">
            <Link
              to="/signup"
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
            >
              Register
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="" to={"/"}>
              DARK KEYBOARD
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    to="/services"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    {" "}
                    Services{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/projects"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    {" "}
                    Projects{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blog"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    {" "}
                    Blog{" "}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">{renderLoginLogoutButton()}</div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
