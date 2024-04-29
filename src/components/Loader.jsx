import React from "react";

const Loader = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-700 via-gray-800 to-purple-900">
      <div className="absolute flex loader">
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{ "--i": 1 }}
        ></div>
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{ "--i": 2 }}
        ></div>
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{ "--i": 3 }}
        ></div>
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{ "--i": 4 }}
        ></div>
      </div>
      <div className="absolute bottom-0 transform -translate-x-1/2 bg-white bg-opacity-0 border border-white border-opacity-25 rounded-b-lg shadow-lg backdrop-filter backdrop-blur-md w-140 h-55 left-1/2 animate-spin-slow"></div>
    </div>
  );
};

export default Loader;
