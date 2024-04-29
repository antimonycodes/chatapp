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
    <div className="flex-1 ">
      {/* user */}
      <div className=" px-8 py-1 flex flex-col items-center border-b border-solid border-[#dddddd35]">
        <img
          src={user?.avatar || "./avatar.png"}
          alt="User Avatar"
          className="w-[60px] object-cover rounded-full"
        />
        <h2>{user?.username}</h2>
        {/* <p>Lorem ipsum dolor sit amet.</p> */}
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
        <button
          className=" px-5 py-1 bg-[rgba(230,74,105,0.533)] text-white border-none rounded cursor-pointer hover:bg-[rgba(220,20,60,0.796)]"
          onClick={handleBlock}
        >
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block user"}
        </button>
        <button
          className=" px-5 py-1 bg-[#1a73e8] text-white border-none rounded cursor-pointer hover:bg-[rgba(220,20,60,0.796)]"
          onClick={() => auth.signOut()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Details;
