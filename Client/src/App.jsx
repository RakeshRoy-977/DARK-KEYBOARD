import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TypingTest from "./Pages/TypingTest";
import Err404 from "./Pages/Err404";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./Store/isLoggedInSlice";
import Ranking from "./Pages/Ranking";
import ContactUsPage from "./Pages/ContactUsPage";
import SumitJoke from "./Pages/SumitJoke";

const App = () => {
  const isLoggedin = useSelector(selectIsLoggedIn);
  console.log(isLoggedin);
  return (
    <>
      {isLoggedin ? (
        <>
          <Navbar />
          <Routes>
            <Route path="TypingTest" element={<TypingTest />} />
            <Route path="/" element={<HomePage />} />
            <Route path="Ranking" element={<Ranking />} />
            <Route path="ContactUsPage" element={<ContactUsPage />} />
            <Route path="SumitJokes" element={<SumitJoke />} />
            <Route path="*" element={<Err404 />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="Ranking" element={<Ranking />} />
            <Route path="ContactUsPage" element={<ContactUsPage />} />
            <Route path="SumitJokes" element={<SumitJoke />} />
            <Route path="*" element={<Err404 />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
