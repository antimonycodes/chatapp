import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../lib/Firebase";
import { useChatStore } from "../lib/ChatStore";
// import { updateDoc } from "firebase/database";
import { useUserStore } from "../lib/Userstore";
import upload from "../lib/Upload";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const openDetails = () => {
    setDetailsOpen((prev) => !prev);
    console.log("details open");
  };

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  //
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  const handleEmoji = (e) => {
    // console.log(e);
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };
  console.log(text);

  const handleImg = (e) => {
    if (e.target.files[0])
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
  };

  const handleSend = async () => {
    // if (text === "") return;
    if (text === "" || !currentUser || !currentUser.id) return;

    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id];

      if (user) {
        userIDs.push(user.id);
      }

      userIDs.forEach(async (id) => {
        if (!id) return;
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          console.log(userChatsData); // Log userChatsData to inspect its structure

          // Find the index where chatId matches
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          console.log("chatIndex:", chatIndex);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };
  console.log(user); // Check the structure and value of the user object

  // const messages = [
  //   {
  //     id: 1,
  //     avatar: "/avatar.png",
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
  //     timestamp: "1 min ago",
  //   },
  //   {
  //     id: 2,
  //     avatar: null,
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
  //     timestamp: "1 min ago",
  //   },
  //   {
  //     id: 3,
  //     avatar: "/avatar.png",
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
  //     timestamp: "1 min ago",
  //   },
  //   {
  //     id: 4,
  //     avatar: null,
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
  //     timestamp: "1 min ago",
  //   },
  //   {
  //     id: 5,
  //     avatar: "/avatar.png",
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
  //     timestamp: "1 min ago",
  //   },
  //   {
  //     id: 6,
  //     avatar: null,
  //     content:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus consequuntur sit, culpa debitis rerum impedit voluptate obcaecati maxime. Reiciendis, modi.",
  //     timestamp: "1 min ago",
  //   },
  // ];
  return (
    <div className="relative flex flex-col h-full overflow-scroll flex-2">
      {/* details */}
      {detailsOpen && (
        <div className="absolute z-50 w-full h-full bg-black xl:hidden">
          <div className=" px-3 py-3 flex items-center  gap-10 border border-b border-[#dddddd35]">
            <div
              className="text-xl "
              onClick={() => setDetailsOpen((prev) => !prev)}
            >
              X
            </div>
            <div>Contact Info</div>
          </div>
          <div className="flex-1 ">
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
            <div className="flex flex-col gap-2 px-5 py-1 ">
              <div>
                <div className="flex items-center justify-between ">
                  <span>Chat Settings</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between ">
                  <span>Chat Settings</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between ">
                  <span>Privacy & help</span>
                  <img
                    src="/arrowUp.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
              </div>{" "}
              <div>
                <div className="flex items-center justify-between ">
                  <span>Shared photos</span>
                  <img
                    src="/arrowDown.png"
                    alt=""
                    className=" w-7 h-7 px-2 py-2 bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer "
                  />
                </div>
                {/* photos */}
                <div className="flex flex-col gap-2 mt-4 ">
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-5 ">
                      <img
                        src="/bi.jpg"
                        alt=""
                        className="object-cover w-10 h-10 rounded-md "
                      />
                      <span className="text-sm font-light text-gray-200 ">
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
                    <div className="flex items-center gap-5 ">
                      <img
                        src="/bi.jpg"
                        alt=""
                        className="object-cover w-10 h-10 rounded-md "
                      />
                      <span className="text-sm font-light text-gray-200 ">
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
                    <div className="flex items-center gap-5 ">
                      <img
                        src="/bi.jpg"
                        alt=""
                        className="object-cover w-10 h-10 rounded-md "
                      />
                      <span className="text-sm font-light text-gray-200 ">
                        photo_2024_2.png
                      </span>
                    </div>
                    <img
                      src="download.png"
                      alt=""
                      className=" w-7 h-7 bg-[rgba(17,25,40,0.3)] px-2 py-2 rounded-full cursor-pointer"
                    />
                  </div>{" "}
                  {/* <div className="flex items-center justify-between ">
              <div className="flex items-center gap-5 ">
                <img
                  src="/bi.jpg"
                  alt=""
                  className="object-cover w-10 h-10 rounded-md "
                />
                <span className="text-sm font-light text-gray-200 ">
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
                <div className="flex items-center justify-between ">
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
        <div className="flex items-center gap-5 ">
          <img
            src={user?.avatar || "/avatar.png"}
            alt=""
            className="object-cover w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col " onClick={openDetails}>
            <span className="text-lg font-bold ">{user?.username}</span>
            <p className=" text-sm font-light text-[#a5a5a5]">
              {" "}
              Lorem ipsum, dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <img src="/phone.png" alt="" width={20} />
          <img src="/video.png" alt="" width={20} />
          <img src="/info.png" alt="" width={20} />
        </div>
      </div>
      {/* CENTER SECTION */}
      <div className="flex flex-col flex-1 gap-5 px-3 py-5 overflow-scroll ">
        {chat?.messages?.map((message) => (
          <div
            key={message?.createdAt}
            className={
              message.senderId === currentUser?.id ? "message-own" : "message"
            }
          >
            <div className="flex flex-col flex-1 gap-1">
              {/* <img
                src="/bi.jpg"
                alt=""
                className=" w-full h-[300px] rounded-xl"
              /> */}
              {message.img && (
                <img
                  src={message.img}
                  alt=""
                  className=" w-full h-[300px] rounded-xl"
                />
              )}
              <p className=" px-3 py-5 bg-[rgba(17,25,40,0.3)] rounded-xl w-fit items-end flex">
                {message.text}
              </p>
              {/* <span className="text-sm ">{message.createdAt}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message-own">
            <div>
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
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
        <div className="flex gap-5 cursor-pointer ">
          <label htmlFor="file">
            <img src="/img.png" alt="" width={20} />
          </label>
          <input
            type="file"
            id="file"
            style={{
              display: "none",
            }}
            onChange={handleImg}
          />
          <img src="/camera.png" alt="" width={20} />
          <img src="/mic.png" alt="" width={20} />
        </div>
        <input
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          className=" flex-1  border-none outline-none text-white bg-[rgba(17,25,40,0.5)] px-5 py-3 rounded-md text-base disabled:cursor-not-allowed"
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="relative cursor-pointer ">
          <img
            src="/emoji.png"
            alt=""
            width={20}
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="absolute left-0 bottom-12">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
          {/* {openEmoji ? (
            ""
          ) : (
            <div className="absolute ">
              <EmojiPicker />
            </div>
          )} */}
        </div>
        <button
          className=" bg-[#5183fe] text-white px-5 py-2 border-none cursor-pointer rounded-md disabled:bg-[#5182feb4] disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
