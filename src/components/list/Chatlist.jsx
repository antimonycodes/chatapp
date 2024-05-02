import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { useUserStore } from "../../lib/Userstore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import { useChatStore } from "../../lib/ChatStore";
import Chat from "../Chat";
import { FaAngleLeft } from "react-icons/fa6";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(null); // State to track the selected chat

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (currentUser) {
      const unsub = onSnapshot(
        doc(db, "userchats", currentUser.id),
        async (res) => {
          const items = res.data()?.chats || [];
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });
          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      );

      return () => {
        unsub();
      };
    }
  }, [currentUser]);

  const handleSelect = async (chat) => {
    setSelectedChat(chat); // Set the selected chat

    // Update isSeen status of the selected chat
    const userChats = chats.map((item) => ({
      ...item,
      isSeen: item.chatId === chat.chatId ? true : item.isSeen,
    }));

    const userChatsRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatsRef, { chats: userChats });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.error("Failed to update chat visibility:", error);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex-1 ">
      {/* Chat list */}
      <div>
        <div className="flex items-center gap-3 px-3 py-3">
          <div
            className="flex-1 flex items-center  gap-5 rounded-xl py-[8px] px-[10px]"
            style={{ background: "rgba(17,25,40,0.5)" }}
          >
            <img src="/search.png" alt="" width={20} height={20} />
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setInput(e.target.value)}
              className="text-white bg-transparent border-none outline-none grow"
            />
          </div>
          <img
            src={addMode ? "/minus.png" : "/Icon.png"}
            alt=""
            width={46}
            className="px-3 py-3 rounded-lg cursor-pointer"
            style={{ background: "rgba(17,25,40,0.5)" }}
            onClick={() => setAddMode((prev) => !prev)}
          />
        </div>

        {filteredChats.map((chat) => (
          <div
            key={chat.chatId}
            className="flex items-center gap-5 px-3 py-5 cursor-pointer border-b border-solid  border-[#dddddd35]"
            onClick={() => handleSelect(chat)}
            style={{ background: chat?.isSeen ? "transparent" : "#5183fe" }}
          >
            <img
              src={chat.user.avatar || "/avatar.png"}
              className="object-cover w-[60px] h-[60px] rounded-full"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <span className="font-medium">{chat.user.username}</span>
              <p className="text-sm font-light">{chat.lastMessage}</p>
            </div>
          </div>
        ))}

        {addMode && <AddUser setAddMode={setAddMode} />}
      </div>

      {/* Chat window overlay (for mobile screens) */}
      {selectedChat && (
        <div className="md:hidden flex  absolute inset-0 bg-black z-10">
          <FaAngleLeft
            onClick={() => setSelectedChat(null)}
            className="text-3xl mt-6 h-fit"
          />
          {/* Chat component */}
          <div className="w-full">
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatlist;
