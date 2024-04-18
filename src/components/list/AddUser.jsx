import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../lib/Firebase";
// import { update } from "firebase/database";
import { useUserStore } from "../../lib/Userstore";
// import { serverTimestamp } from "firebase/database";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      // create a query against the collection
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" w-max  h-max px-8 z-50 py-8 bg-[rgba(17,25,40,0.85)] rounded-xl absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto ">
      <form action="" onSubmit={handleSearch} className=" flex gap-5">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className=" px-5 py-4 rounded-xl outline-none border-none"
        />
        <button className=" px-5 py-4 rounded-xl bg-[#1a73e8] text-white cursor-pointer">
          Search
        </button>
      </form>
      {/* user */}
      {user && (
        <div className=" mt-12 flex items-center justify-between">
          {/* user details */}
          <div className=" flex items-center gap-5">
            <img
              src={user.avatar || "/avatar.png"}
              alt=""
              className=" w-12 object-cover h-12 rounded-full "
            />
            <span>{user.username}</span>
          </div>
          <button
            className=" px-3 py-2 rounded-xl bg-[#1a73e8] text-white cursor-pointer"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
