import { useEffect, useState } from "react";
// import Chat from "./components/Chat";
// import Details from "./components/Details";
// import Notification from "./components/Notification";
// import Login from "./_auth/Login";
// import List from "./components/list/List";
import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/Firebase";
// import { useUserStore } from "./lib/Userstore";
// import { useChatStore } from "../lib/ChatStore";
import Details from "../components/Details";
import Notification from "../components/Notification";
import Signin from "../_auth/Signin";
import List from "../components/list/List";
import { auth } from "../lib/Firebase";
import { useChatStore } from "../lib/ChatStore";
import { useUserStore } from "../lib/Userstore";
import Chat from "../components/Chat";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useState } from "react";
// import { BounceLoader } from "react-spinners";
// import { useChatStore } from "./lib/ChatStore";
// import { Comment } from "react-loader-spinner";
import Loader from "../components/Loader";

const Home = () => {
  const User = false;
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);

  // let [loading, setLoading] = useState(true);
  // let [color, setColor] = useState("blue");

  //   // const override = {
  //   //   display: "block",
  //   //   margin: "0 auto",
  //   //   borderColor: "red",
  //   // };

  if (isLoading)
    return (
      //       // <div className=" px-12 py-12 rounded-xl bg-[rgba(17,25,40,0.9)] text-4xl">
      //       //   Loading...
      //       // </div>
      <div className="sweet-loading">
        {/* <BounceLoader
         color={color}
         loading={loading}
         cssOverride={override}
         size={150}
         aria-label="Loading Spinner"
         data-testid="loader"
       /> */}

        {/* <Comment
          loading={true}
          height={140}
          width={100}
          radius={9}
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        /> */}
        <Loader />
      </div>
    );
  return (
    // <div className=" h-full bg-green-700">
    <div
      className="  h-screen w-full text-white rounded-lg  border border-solid border-gray-500  md:flex  "
      style={{
        background:
          "linear-gradient(90deg, rgba(91,33,182,0.75) 47%, rgba(39,121,216,0.75) 100%)",
      }}
    >
      {currentUser ? (
        <>
          <div className="flex-1 ">
            <List />
          </div>
          {chatId && (
            <div
              className="hidden md:block border-l border-r border-solid border-[#dddddd35] "
              style={{ flex: "2" }}
            >
              <Chat currentUser={currentUser} />
            </div>
          )}
          {chatId && (
            <div className="flex-1 hidden xl:block">
              <Details />
            </div>
          )}
        </>
      ) : (
        <Signin />
      )}
      <Notification />
    </div>
    // </div>
  );
};

export default Home;
