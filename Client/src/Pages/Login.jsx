import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../Store/isLoggedInSlice";

const Login = () => {
  const dispatch = useDispatch();
  const NAV = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://dark-keyboard.onrender.com/api/login",
        formData
      );
      // Set the received token as a cookie named 'token'
      Cookies.set("token", res.data, { expires: 30 });
      // Dispatch the setUser action with the user data received from the response
      dispatch(login());
      console.log(res);
      NAV("/");
      // setFormData({
      //   email: "",
      //   password: "",
      // });

      // Show success toast
      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      // Check if error response contains a message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Show error toast with the message from the response
        toast.error(error.response.data.message);
      } else {
        // Show generic error toast
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          {/* Background image content */}
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="w-full py-6 z-20">
            <h1 className="my-6">
              <svg
                viewBox="0 0 247 31"
                className="w-auto h-7 sm:h-8 inline-flex"
              >
                {/* Logo SVG */}
              </svg>
            </h1>
            <form
              onSubmit={handleSubmit}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button
                  type="submit"
                  className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  sign in
                </button>
              </div>
            </form>
            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden">
              {/* Social media icons */}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
