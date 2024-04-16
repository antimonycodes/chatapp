import { useEffect } from "react";
import Chat from "./components/Chat";
import Details from "./components/Details";
import Notification from "./components/Notification";
import Login from "./components/auth/Login";
import List from "./components/list/List";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/Firebase";

function App() {
  const user = false;
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);
  return (
    <>
      <div
        className=" w-[80vw] h-[90vh] rounded-lg  border border-solid border-gray-500  md:flex  bg-emerald-300 "
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(91,33,182,0.75) 47%, rgba(39,121,216,0.75) 100%)",
        // }}
      >
        {user ? (
          <>
            <div className="flex-1 ">
              <List />
            </div>
            <div
              className="hidden md:block border-l border-r border-solid border-[#dddddd35] "
              style={{ flex: "2" }}
            >
              <Chat />
            </div>
            <div className="flex-1 hidden  xl:block">
              <Details />
            </div>
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </>
  );
}

export default App;
