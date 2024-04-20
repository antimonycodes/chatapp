import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { useUserStore } from "../../lib/Userstore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import { useChatStore } from "../../lib/ChatStore";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    if (currentUser) {
      const unsub = onSnapshot(
        doc(db, "userchats", currentUser.id),
        async (res) => {
          // console.log("Current data: ", doc.data());
          // setChats(doc.data());
          const items = res.data().chats;

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

  console.log(chats);

  // const chatItem = [
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  //   { id: 1, img: "/avatar.png", name: " User Name", message: "hello " },
  // ];

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };
  return (
    <div>
      <div className="flex items-center gap-5 px-3 py-3 ">
        <div
          className=" flex-1 flex items-center gap-5 rounded-xl py-[8px] px-[10px]"
          style={{ background: "rgba(17,25,40,0.5)" }}
        >
          <div className="flex gap-3 ">
            <img src="/search.png" alt="" width={20} height={20} />
            <input
              type="text"
              placeholder="search"
              className="text-white bg-transparent border-none outline-none grow"
            />
          </div>
        </div>
        <img
          src={addMode ? "/minus.png" : "/plus.png"}
          alt=""
          width={36}
          className="px-3 py-3 rounded-lg cursor-pointer "
          style={{ background: "rgba(17,25,40,0.5)" }}
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {/*Chat items */}
      {chats.map((chat) => {
        return (
          <div
            key={chat.chatId}
            className=" flex items-center gap-5 px-3 py-5 cursor-pointer border-b border-solid  border-[#dddddd35]"
            onClick={() => handleSelect(chat.chatId)}
          >
            <img
              src={chat.user.avatar || "./avatar.png"}
              width={50}
              height={50}
              className="object-cover rounded-full "
            />
            <div className="flex flex-col gap-2 ">
              <span className="font-medium ">{chat.user.username}</span>
              <p className="text-sm font-light "> {chat.lastMessage}</p>
            </div>
          </div>
        );
      })}
      {/* <div>
        <img src="/avatar.png" alt="" />
        <div>
          <span>Jane Doe</span>
          <p>hey</p>
        </div>
      </div>
      <div>
        <img src="/avatar.png" alt="" />
        <div>
          <span>Jane Doe</span>
          <p>hey</p>
        </div>
      </div>{" "}
      <div>
        <img src="/avatar.png" alt="" />
        <div>
          <span>Jane Doe</span>
          <p>hey</p>
        </div>
      </div> */}
      {addMode && <AddUser />}
    </div>
  );
};

export default Chatlist;
