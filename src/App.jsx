// import { useEffect } from "react";
// import Chat from "./components/Chat";
// import Details from "./components/Details";
// import Notification from "./components/Notification";
// import Login from "./_auth/Login";
// import List from "./components/list/List";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/Firebase";
// import { useUserStore } from "./lib/Userstore";
// // import ClipLoader from "react-spinners/ClipLoader";
// import { useState } from "react";
// // import { BounceLoader } from "react-spinners";
// import { useChatStore } from "./lib/ChatStore";
// // import { Comment } from "react-loader-spinner";
// import { Comment } from "react-loader-spinner";

import { Route, Routes } from "react-router-dom";
import Signin from "./_auth/Signin";
import Signup from "./_auth/Signup";
import Authlayout from "./_auth/Authlayout";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/Home";

// function App() {
//   // const user = false;
//   const { currentUser, isLoading, fetchUserInfo } = useUserStore();
//   const { chatId } = useChatStore();

//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       fetchUserInfo(user?.uid);
//       console.log(user);
//     });

//     return () => {
//       unSub();
//     };
//   }, [fetchUserInfo]);
//   console.log(currentUser);

//   let [loading, setLoading] = useState(true);
//   // let [color, setColor] = useState("blue");

//   // const override = {
//   //   display: "block",
//   //   margin: "0 auto",
//   //   borderColor: "red",
//   // };

//   if (isLoading)
//     return (
//       // <div className=" px-12 py-12 rounded-xl bg-[rgba(17,25,40,0.9)] text-4xl">
//       //   Loading...
//       // </div>
//       <div className="sweet-loading">
//         {/* <BounceLoader
//           color={color}
//           loading={loading}
//           cssOverride={override}
//           size={150}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         /> */}

//         <Comment
//           loading={true}
//           height={140}
//           width={100}
//           radius={9}
//           color="green"
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         />
//       </div>
//     );
//   return (
//     <>
//       <div
//         className=" w-[80vw] h-[90vh] rounded-lg  border border-solid border-gray-500  md:flex  bg-black "
//         // style={{
//         //   background:
//         //     "linear-gradient(90deg, rgba(91,33,182,0.75) 47%, rgba(39,121,216,0.75) 100%)",
//         // }}
//       >
//         {currentUser ? (
//           <>
//             <div className="flex-1 ">
//               <List />
//             </div>
//             {chatId && (
//               <div
//                 className="hidden md:block border-l border-r border-solid border-[#dddddd35] "
//                 style={{ flex: "2" }}
//               >
//                 <Chat currentUser={currentUser} />
//               </div>
//             )}
//             {chatId && (
//               <div className="flex-1 hidden xl:block">
//                 <Details />
//               </div>
//             )}
//           </>
//         ) : (
//           <Login />
//         )}
//         <Notification />
//       </div>
//     </>
//   );
// }

// export default App;

const App = () => {
  return (
    <>
      <main>
        <Routes>
          {/* public routes */}
          <Route element={<Authlayout />}>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
