import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../lib/ChatStore";
import { auth, db } from "../lib/Firebase";
import { useUserStore } from "../lib/Userstore";

const Details = () => {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    // resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
      console.log("blocked");
    } catch (err) {
      console.log(err);
    }
  };

  // const handleLogout = () => {
  //   auth.signOut();
  //   resetChat()
  // };

  return (
    <div className="flex-1 flex h-screen flex-col">
      {/* user */}
      <div className="px-8 py-1 flex flex-col items-center border-b border-solid border-[#dddddd35]">
        <img
          src={user?.avatar || "./avatar.png"}
          alt="User Avatar"
          className="w-[60px] object-cover rounded-full"
        />
        <h2>{user?.username}</h2>
        {/* <p>Lorem ipsum dolor sit amet.</p> */}
      </div>

      {/* info */}
      <div className="flex flex-col justify-end gap-4  flex-1 px-5 py-1">
        <button
          className="px-5 py-1 bg-[rgba(230,74,105,0.533)] text-white border-none rounded cursor-pointer hover:bg-[rgba(220,20,60,0.796)]"
          onClick={handleBlock}
        >
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block user"}
        </button>
        <button
          className="px-5 py-1 bg-[#D185FF] text-white border-none rounded cursor-pointer hover:bg-[rgba(220,20,60,0.796)]"
          onClick={() => auth.signOut()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Details;
