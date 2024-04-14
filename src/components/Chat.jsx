const Chat = () => {
  return (
    <div className=" flex-2 h-full">
      {/* TOP SECTION */}
      <div className=" px-3 py-5 flex items-center justify-between border border-b border-[#dddddd35]">
        <div className=" flex items-center gap-5 ">
          <img
            src="/avatar.png"
            alt=""
            width={60}
            height={60}
            className=" rounded-full object-cover "
          />
          <div className=" flex flex-col ">
            <span className=" text-lg font-bold">User Name</span>
            <p className=" text-sm font-light text-[#a5a5a5]">
              {" "}
              Lorem ipsum, dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className=" flex items-center gap-5">
          <img src="/phone.png" alt="" width={20} />
          <img src="/video.png" alt="" width={20} />
          <img src="/info.png" alt="" width={20} />
        </div>
      </div>
      {/* CENTER SECTION */}
      <div></div>
      {/* BOTTOM  */}
      <div className=" px-3 py-5 flex items-center justify-between border border-solid border-t border-[#dddddd35] gap-5">
        <div className=" flex gap-5 cursor-pointer">
          <img src="/img.png" alt="" width={20} />
          <img src="/camera.png" alt="" width={20} />
          <img src="/mic.png" alt="" width={20} />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className=" flex-1  border-none outline-none text-white bg-[rgba(17,25,40,0.5)] px-5 py-3 rounded-md text-base"
        />
        <div className=" cursor-pointer">
          <img src="/emoji.png" alt="" width={20} />
        </div>
        <button className=" bg-[#5183fe] text-white px-5 py-2 border-none cursor-pointer rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
