import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const openDetails = () => {
    setDetailsOpen((prev) => !prev);
    console.log("details open");
  };
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handleEmoji = (e) => {
    // console.log(e);
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };
  console.log(text);
  const messages = [
    {
      id: 1,
      avatar: "/avatar.png",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
      timestamp: "1 min ago",
    },
    {
      id: 2,
      avatar: null,
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
      timestamp: "1 min ago",
    },
    {
      id: 3,
      avatar: "/avatar.png",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
      timestamp: "1 min ago",
    },
    {
      id: 4,
      avatar: null,
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
      timestamp: "1 min ago",
    },
    {
      id: 5,
      avatar: "/avatar.png",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
      timestamp: "1 min ago",
    },
    {
      id: 6,
      avatar: null,
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
      timestamp: "1 min ago",
    },
  ];
  return (
    <div className=" flex-2 h-full flex flex-col relative overflow-scroll">
      {/* details */}
      {detailsOpen && (
        <div className=" absolute bg-red-950 h-full w-full z-50 xl:hidden">
          <div className=" px-3 py-3 flex items-center  gap-10 border border-b border-[#dddddd35]">
            <div
              className=" text-xl"
              onClick={() => setDetailsOpen((prev) => !prev)}
            >
              X
            </div>
            <div>Contact Info</div>
          </div>
          <div className=" flex-1">
            {/* user */}
            <div className=" px-8 py-1 flex flex-col items-center  border-b border-solid border-[#dddddd35] ">
              <img
                src="/avatar.png"
                alt=""
                className=" w-[60px] object-cover rounded-full"
              />
              <h1>Jane Doe</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            {/* info */}
            <div className=" px-5 py-1 flex flex-col gap-2">
              <div>
                <div className=" flex items-center justify-between">
                  <span>Chat Settings</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-between">
                  <span>Chat Settings</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-between">
                  <span>Privacy & help</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>{" "}
              <div>
                <div className=" flex items-center justify-between">
                  <span>Shared photos</span>
                  <img
                    src="/arrowDown.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
                {/* photos */}
                <div className=" flex flex-col gap-2 mt-4">
                  <div className=" flex items-center justify-between ">
                    <div className=" flex items-center gap-5">
                      <img
                        src="/bi.jpg"
                        alt=""
                        className=" w-10 h-10 rounded-md object-cover"
                      />
                      <span className="text-sm text-gray-200 font-light ">
                        photo_2024_2.png
                      </span>
                    </div>
                    <img
                      src="download.png"
                      alt=""
                      className=" w-7 h-7 bg-[rgba(17,25,40,0.3)] px-2 py-2 rounded-full cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <div className=" flex items-center gap-5">
                      <img
                        src="/bi.jpg"
                        alt=""
                        className=" w-10 h-10 rounded-md object-cover"
                      />
                      <span className="text-sm text-gray-200 font-light ">
                        photo_2024_2.png
                      </span>
                    </div>
                    <img
                      src="download.png"
                      alt=""
                      className=" w-7 h-7 bg-[rgba(17,25,40,0.3)] px-2 py-2 rounded-full cursor-pointer"
                    />
                  </div>{" "}
                  <div className="flex items-center justify-between ">
                    <div className=" flex items-center gap-5">
                      <img
                        src="/bi.jpg"
                        alt=""
                        className=" w-10 h-10 rounded-md object-cover"
                      />
                      <span className="text-sm text-gray-200 font-light ">
                        photo_2024_2.png
                      </span>
                    </div>
                    <img
                      src="download.png"
                      alt=""
                      className=" w-7 h-7 bg-[rgba(17,25,40,0.3)] px-2 py-2 rounded-full cursor-pointer"
                    />
                  </div>{" "}
                  {/* <div className=" flex items-center justify-between ">
              <div className=" flex items-center gap-5">
                <img
                  src="/bi.jpg"
                  alt=""
                  className=" w-10 h-10 rounded-md object-cover"
                />
                <span className="text-sm text-gray-200 font-light ">
                  photo_2024_2.png
                </span>
              </div>
              <img
                src="download.png"
                alt=""
                className=" w-7 h-7 bg-[rgba(17,25,40,0.3)] px-2 py-2 rounded-full cursor-pointer"
              />
            </div>{" "} */}
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-between">
                  <span>Sharedfiles</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>
              <button className=" px-5 py-1 bg-[rgba(230,74,105,0.533)] text-white border-none rounded cursor-pointer hover:bg-[rgba(220,20,60,0.796)]">
                Block User
              </button>
              <button className=" px-5 py-1 bg-[#1a73e8] text-white border-none rounded cursor-pointer hover:bg-[rgba(220,20,60,0.796)]">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP SECTION */}
      <div className=" px-3 py-3 flex items-center justify-between border border-b border-[#dddddd35]">
        <div className=" flex items-center gap-5 ">
          <img
            src="/avatar.png"
            alt=""
            width={50}
            height={50}
            className=" rounded-full object-cover "
          />
          <div
            className=" flex flex-col  bg-emerald-500 "
            onClick={openDetails}
          >
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
      <div className=" px-3 py-5 flex-1 overflow-scroll flex flex-col gap-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.avatar ? "message-with-avatar" : "message-without-avatar"
            }
          >
            {message.avatar && (
              <img
                src={message.avatar}
                alt=""
                className=" w-8 h-8  rounded-full object-cover"
              />
            )}
            <div className="flex gap-1 flex-col flex-1">
              <img
                src="/bi.jpg"
                alt=""
                className=" w-full h-[300px] rounded-xl"
              />
              <p className=" px-3 py-5 bg-[rgba(17,25,40,0.3)] rounded-xl">
                {message.content}
              </p>
              <span className=" text-sm">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {/* <div>
          <img src="/avatar.png" alt="" />
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus consequuntur sit, culpa debitis rerum impedit voluptate
              obcaecati maxime. Reiciendis, modi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus consequuntur sit, culpa debitis rerum impedit voluptate
              obcaecati maxime. Reiciendis, modi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div>
          <img src="/avatar.png" alt="" />

          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus consequuntur sit, culpa debitis rerum impedit voluptate
              obcaecati maxime. Reiciendis, modi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus consequuntur sit, culpa debitis rerum impedit voluptate
              obcaecati maxime. Reiciendis, modi.
            </p>
            <span>1 min ago</span>
          </div>
        </div> */}
        <div ref={endRef}></div>
      </div>
      {/* BOTTOM  */}
      <div className=" px-3 py-5 flex items-center justify-between border border-solid border-t border-[#dddddd35] gap-5 mt-auto">
        <div className=" flex gap-5 cursor-pointer">
          <img src="/img.png" alt="" width={20} />
          <img src="/camera.png" alt="" width={20} />
          <img src="/mic.png" alt="" width={20} />
        </div>
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          className=" flex-1  border-none outline-none text-white bg-[rgba(17,25,40,0.5)] px-5 py-3 rounded-md text-base"
          onChange={(e) => setText(e.target.value)}
        />
        <div className=" cursor-pointer relative">
          <img
            src="/emoji.png"
            alt=""
            width={20}
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className=" absolute bottom-12 left-0">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
          {/* {openEmoji ? (
            ""
          ) : (
            <div className=" absolute">
              <EmojiPicker />
            </div>
          )} */}
        </div>
        <button className=" bg-[#5183fe] text-white px-5 py-2 border-none cursor-pointer rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
