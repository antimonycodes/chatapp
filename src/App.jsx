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

// import { Route, Routes } from "react-router-dom";
// import Signin from "./_auth/Signin";
// import Signup from "./_auth/Signup";
// import Authlayout from "./_auth/Authlayout";
// import RootLayout from "./_root/RootLayout";
// import Home from "./_root/Home";

// const App = () => {
//   return (
//     <>
//       <main>
//         <Routes>
//           {/* public routes */}
//           <Route element={<Authlayout />}>
//             <Route path="/sign-in" element={<Signin />} />
//             <Route path="/sign-up" element={<Signup />} />
//           </Route>

//           {/* private routes */}
//           <Route element={<RootLayout />}>
//             <Route index element={<Home />} />
//           </Route>
//         </Routes>
//       </main>
//     </>
//   );
// };

// export default App;
// App.js

// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./_auth/Signin";
import Signup from "./_auth/Signup";
import Authlayout from "./_auth/Authlayout";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/Home";
// import Introduction from "./components/Introduction";
// import Introduction from "./Introduction";

const App = () => {
  // const [showIntroduction, setShowIntroduction] = useState(true);

  // const handleCloseIntroduction = () => {
  //   setShowIntroduction(false);
  // };

  return (
    <>
      <main
        className=" w-full p-0 m-0"
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(91,33,182,0.75) 47%, rgba(39,121,216,0.75) 100%)",
        // }}
      >
        {/* {showIntroduction && <Introduction onClose={handleCloseIntroduction} />} */}
        <Routes>
          {/* public routes */}
          <Route element={<Authlayout />}>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>

          {/* private routes */}
          {/* <Route element={<RootLayout />}> */}
          <Route index element={<Home />} />
          {/* </Route> */}
        </Routes>
      </main>
    </>
  );
};

export default App;
