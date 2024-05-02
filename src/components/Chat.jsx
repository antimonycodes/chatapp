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
import Details from "./Details";

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

  return (
    <div className="relative   flex flex-col h-full overflow-scroll ">
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
          <Details />
        </div>
      )}

      {/* TOP SECTION */}
      <div className=" px-3 py-3 flex  items-center justify-between border border-b border-[#dddddd35]">
        <div className="flex items-center gap-5 ">
          <img
            src={user?.avatar || "/avatar.png"}
            alt=""
            className="object-cover w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col ">
            <span className="text-lg font-bold ">{user?.username}</span>
            {/* <p className=" text-sm font-light text-[#a5a5a5]">
             
              Lorem ipsum, dolor sit amet consectetur
            </p> */}
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          {/* <img src="/phone.png" alt="" width={20} /> */}
          {/* <img src="/video.png" alt="" width={20} /> */}
          <img src="/info.png" alt="" width={20} onClick={openDetails} />
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
          {/* <img src="/camera.png" alt="" width={20} /> */}
          {/* <img src="/mic.png" alt="" width={20} /> */}
        </div>
        {/* <input
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          className=" flex-1 shrink border-none outline-none text-white bg-[rgba(17,25,40,0.5)] px-5 py-3 rounded-md text-base disabled:cursor-not-allowed"
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        /> */}
        <input
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          className="flex-1 min-w-0 border-none outline-none text-white bg-[rgba(17,25,40,0.5)] px-5 py-3 rounded-md text-base disabled:cursor-not-allowed"
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
          <div className="absolute right-0 bottom-12">
            <EmojiPicker
              className=" "
              open={openEmoji}
              onEmojiClick={handleEmoji}
            />
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
          className=" bg-[#D185FF] text-white px-5 py-2 border-none cursor-pointer rounded-md disabled:bg-[#5182feb4] disabled:cursor-not-allowed"
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
