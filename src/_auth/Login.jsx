// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { auth, db } from "../lib/Firebase";
// import { doc, setDoc } from "firebase/firestore";
// import upload from "../lib/Upload";
// import { BeatLoader } from "react-spinners";

// const Login = () => {
//   const [avatar, setAvatar] = useState({
//     file: "null",
//     url: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleAvatar = (e) => {
//     if (e.target.files[0])
//       setAvatar({
//         file: e.target.files[0],
//         url: URL.createObjectURL(e.target.files[0]),
//       });
//   };

//   return (
//     <>
//       <div className="dark fire">
//         <h1 className="Blazing">myChat</h1>
//       </div>
//       {/* <div className="logo">
//         <div id="ten" className="ten"></div>
//         <div id="ten" className="ten"></div>
//       </div> */}
//       <div className="flex items-center w-full h-full gap-24 ">
//         <div className="flex flex-col items-center flex-1 gap-5 ">
//           <h2>Welcome back</h2>
//           <form
//             action="submit"
//             onSubmit={handleLogin}
//             className="flex flex-col items-center justify-center gap-5 "
//           >
//             <input
//               type="text"
//               placeholder="Email"
//               name="email"
//               className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
//             />
//             <button
//               disabled={loading}
//               className=" w-full px-5 disabled:cursor-not-allowed disabled:bg-[#1f8ff19c] py-2 border-none bg-[#1f8ef1] text-white rounded-md cursor-pointer "
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center gap-1 sweet-loading">
//                   <h1>Loading</h1>

//                   <BeatLoader
//                     color={color}
//                     loading={loading}
//                     cssOverride={override}
//                     size={10}
//                     aria-label="Loading Spinner"
//                     data-testid="loader"
//                   />
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>
//         </div>
//         {/* separator */}
//         <div className=" w-1 h-[80%] bg-[#dddddd35]"></div>
//         {/* sign up form */}
//         <div className="flex flex-col items-center flex-1 gap-5">
//           <h2>Create an Account</h2>
//           <form
//             action=""
//             onSubmit={handleRegister}
//             className="flex flex-col items-center justify-center gap-5 "
//           >
//             <label
//               htmlFor="file"
//               className="flex items-center w-full gap-5 underline cursor-pointer "
//             >
//               <img
//                 src={avatar.url || "./avatar.png"}
//                 alt=""
//                 className=" w-12 h-12 rounded-md object-cover opacity-[60%]"
//               />
//               Upload an image
//             </label>
//             <input
//               type="file"
//               id="file"
//               placeholder=""
//               style={{ display: "none" }}
//               onChange={handleAvatar}
//               className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Username"
//               name="username"
//               className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Email"
//               name="email"
//               className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
//             />
//             <button
//               disabled={loading}
//               className=" w-full px-5 py-2 border-none bg-[#1f8ef1] text-white rounded-md cursor-pointer "
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center sweet-loading">
//                   <h1>Loading</h1>

//                   <BeatLoader
//                     color={color}
//                     loading={loading}
//                     cssOverride={override}
//                     size={10}
//                     aria-label="Loading Spinner"
//                     data-testid="loader"
//                   />
//                 </div>
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
