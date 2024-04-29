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

  // const handleAdd = async () => {
  //   const chatRef = collection(db, "chats");
  //   const userChatsRef = collection(db, "userchats");

  //   try {
  //     const newChatRef = doc(chatRef); // Create a new chat reference.
  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });

  //     // Helper function to update or create the chat document
  //     const updateOrCreateChatDocument = async (userId, chatData) => {
  //       const userChatDocRef = doc(userChatsRef, userId);
  //       // Try to get the document
  //       const docSnap = await getDoc(userChatDocRef);
  //       if (docSnap.exists()) {
  //         // If document exists, update it
  //         await updateDoc(userChatDocRef, {
  //           chats: arrayUnion(chatData),
  //         });
  //       } else {
  //         // If document does not exist, set a new document with the initial chat
  //         await setDoc(userChatDocRef, {
  //           chats: [chatData],
  //         });
  //       }
  //     };

  //     const chatData = {
  //       chatId: newChatRef.id,
  //       lastMessage: "",
  //       receiverId: currentUser.id,
  //       updatedAt: Date.now(),
  //     };

  //     // Update or create chat document for the user
  //     await updateOrCreateChatDocument(user.id, chatData);

  //     // Adjust receiverId for the current user
  //     chatData.receiverId = user.id;

  //     // Update or create chat document for the current user
  //     await updateOrCreateChatDocument(currentUser.id, chatData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // // };
  // const handleAdd = async () => {
  //   const chatRef = collection(db, "chats");
  //   const userChatsRef = collection(db, "userchats");

  //   try {
  //     // First, fetch the current chat entries for the currentUser
  //     const currentUserChatsDoc = doc(userChatsRef, currentUser.id);
  //     const currentUserChatsSnap = await getDoc(currentUserChatsDoc);

  //     let existingChats = currentUserChatsSnap.exists()
  //       ? currentUserChatsSnap.data().chats
  //       : [];

  //     // Check if there's already a chat with the other user
  //     if (existingChats.some((chat) => chat.receiverId === user.id)) {
  //       console.log("Chat with this user already exists.");
  //       return; // Exit if chat already exists
  //     }

  //     // Create a new chat document
  //     const newChatRef = doc(chatRef);
  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });

  //     // Add new chat to both users' chat lists
  //     await updateDoc(doc(userChatsRef, user.id), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: currentUser.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });

  //     await updateDoc(doc(userChatsRef, currentUser.id), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: user.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
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
    <div className=" w-max  h-max px-8 z-50 py-8 bg-[rgba(17,25,40,0.85)] rounded-xl absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto ">
      <form action="" onSubmit={handleSearch} className="flex gap-5 ">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="px-5 py-4 border-none outline-none rounded-xl"
        />
        <button className=" px-5 py-4 rounded-xl bg-[#1a73e8] text-white cursor-pointer">
          Search
        </button>
      </form>
      {/* user */}
      {user && (
        <div className="flex items-center justify-between mt-12 ">
          {/* user details */}
          <div className="flex items-center gap-5 ">
            <img
              src={user.avatar || "/avatar.png"}
              alt=""
              className="object-cover w-12 h-12 rounded-full "
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
