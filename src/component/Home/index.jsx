import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="main flex flex-col min-h-screen text-white text-center">
      <motion.div
        className="flex flex-col gap-10 justify-center items-center h-screen"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{scale: 0, opacity: 0}}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="border-2 border-primary-40 rounded-3xl max-md:rounded-2xl"
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <img src={Logo} alt="Home page logo" className="h-36 w-36 max-md:h-16 max-md:w-16" />
        </motion.div>
        <h1 className="font-bold text-6xl max-md:text-3xl">Decentralize Voting</h1>
        <div className="container w-2/6 max-md:w-full max-md:px-2">
          <p className="inter-heading2 max-md:text-lg">
            A new and modern voting application using the lastest web 3.0
            technology
          </p>
        </div>
        <div className="container w-1/12 h-3 sm:w-full max-md:w-full">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0">
              Get Started
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
