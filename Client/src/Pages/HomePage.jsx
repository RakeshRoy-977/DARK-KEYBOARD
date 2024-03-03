import React, { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    gsap.from(".hero", { opacity: 0, duration: 1, delay: 0.5, y: 50 });
    gsap.to(".bigText", { color: "yellow", delay: 3 });
  }, []);

  return (
    <>
      <section className="relative bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center ">
          <div className="mx-auto max-w-3xl  text-center">
            <h1 className="hero bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-7xl">
              Welcome to
              <span className="sm:block">DARK KEYBOARD </span>
            </h1>

            <p className="bigText mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Improve Your Typing Speed and Accuracy with Fun Challenges
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                to={"/TypingTest"}
              >
                Get Started
              </Link>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="https://www.linkedin.com/in/rakeshroy977/"
              >
                Meet Founder
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
