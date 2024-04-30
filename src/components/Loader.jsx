const Loader = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-black">
      <div className="absolute flex z-50 loader">
        {/* Loader circles */}
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{
            animation: "anim 2s infinite linear",
            animationDelay: "-0.3s",
          }}
        ></div>
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{
            animation: "anim 2s infinite linear",
            animationDelay: "-0.6s",
          }}
        ></div>
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{
            animation: "anim 2s infinite linear",
            animationDelay: "-0.9s",
          }}
        ></div>
        <div
          className="w-6 h-6 bg-gray-300 rounded-full animate-bounce"
          style={{
            animation: "anim 2s infinite linear",
            animationDelay: "-1.2s",
          }}
        ></div>
      </div>
      {/* Transparent overlay */}
      <div className="absolute bottom-0 transform -translate-x-1/2 bg-white bg-opacity-0 border border-white border-opacity-25 rounded-b-lg shadow-lg backdrop-filter backdrop-blur-md w-140 h-55 left-1/2 animate-spin-slow"></div>
    </div>
  );
};

export default Loader;
