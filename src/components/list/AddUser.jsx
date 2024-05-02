import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getDoc,
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
import { IoMdClose } from "react-icons/io";
// import { serverTimestamp } from "firebase/database";

const AddUser = ({ setAddMode }) => {
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
      // Check if the current user's chat document exists
      const currentUserChatsDoc = doc(userChatsRef, currentUser.id);
      const currentUserChatsSnap = await getDoc(currentUserChatsDoc);

      if (!currentUserChatsSnap.exists()) {
        // If the document doesn't exist, create it with an empty array of chats
        await setDoc(currentUserChatsDoc, { chats: [] });
      }

      // Fetch the current chat entries for the currentUser
      const existingChats = currentUserChatsSnap.exists()
        ? currentUserChatsSnap.data().chats
        : [];

      // Check if there's already a chat with the other user
      if (existingChats.some((chat) => chat.receiverId === user.id)) {
        console.log("Chat with this user already exists.");
        return; // Exit if chat already exists
      }

      // Create a new chat document
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Add new chat to both users' chat lists
      await updateDoc(currentUserChatsDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      // Update the other user's chat list
      const otherUserChatsDoc = doc(userChatsRef, user.id);
      const otherUserChatsSnap = await getDoc(otherUserChatsDoc);
      const otherUserChats = otherUserChatsSnap.exists()
        ? otherUserChatsSnap.data().chats
        : [];

      await updateDoc(otherUserChatsDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-max h-max px-8 z-50 py-8 bg-[rgba(17,25,40,0.85)] rounded-xl absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto ">
      <IoMdClose
        className=" absolute right-2 text-xl top-2 "
        onClick={() => setAddMode(false)}
      />
      <form action="" onSubmit={handleSearch} className="flex gap-5 ">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="px-5 bg-transparent text-white  py-4 border-none outline-none 
           rounded-xl"
        />
        <button className=" px-5 py-4 rounded-xl bg-[#D185FF] text-white cursor-pointer">
          Search
        </button>
      </form>
      {/* user */}
      {user && (
        <div className="flex  flex-col items-center justify-between mt-12 ">
          {/* user details */}
          <div className="flex flex-col items-center gap-5 ">
            <img
              src={user.avatar || "/avatar.png"}
              alt=""
              className="object-cover w-20 h-20 rounded-2xl "
            />
            <span className=" text-xl font-bold">{user.username}</span>
          </div>
          <button
            className=" px-3 py-2 rounded-xl mt-4 bg-[#D185FF] text-white cursor-pointer"
            onClick={handleAdd}
          >
            AddUser
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
