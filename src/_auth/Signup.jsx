import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../lib/Firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../lib/Upload";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";

const Signup = () => {
  const [avatar, setAvatar] = useState({
    file: "null",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  let [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    marginTop: "5px",
    borderColor: "red",
  };

  const handleAvatar = (e) => {
    if (e.target.files[0])
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    // Clear previous errors
    setFormErrors({});

    // Perform client-side validation
    const errors = {};

    if (!username) {
      errors.username = "Please enter a username";
      // toast.error("Please enter a username");
    }

    if (!email) {
      errors.email = "Please enter an email";
      // toast.error("Please enter an email");
    }

    if (!password) {
      errors.password = "Please enter a password";
      // toast.error("Please enter a password");
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      toast.error("Password must be at least 6 characters long");
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, set them in the state and stop further processing
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchat", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-white">
      {/* Signup form */}
      <div className="flex flex-col items-center flex-1 gap-5">
        {/* Logo and app name */}
        <div className="text-4xl flex items-center font-bold">
          <img
            src="/logo.gif"
            alt=""
            className="bg-[#D185FF] w-16 h-12 rounded-md"
          />
          <h1>
            {/* Chat */}
            <span className="inline-block px-0 mx-0 text-white">app</span>
          </h1>
        </div>
        {/* Signup heading */}
        <h2>Create an Account</h2>
        {/* Signup form */}
        <form
          action=""
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-5"
        >
          {/* Avatar upload */}
          <label
            htmlFor="file"
            className="flex items-center w-full gap-5 underline cursor-pointer text-[#D185FF]"
          >
            <img
              src={avatar.url || "./addimage.png"}
              alt=""
              className="w-12 h-12 rounded-md object-cover opacity-[60%]"
            />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
            className="px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          {/* Display error for avatar upload */}
          <p className="text-red-600">{formErrors.avatar}</p>
          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          {/* Display error for username input */}
          <p className="text-red-600">{formErrors.username}</p>
          {/* Email input */}
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          {/* Display error for email input */}
          <p className="text-red-600">{formErrors.email}</p>
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          {/* Display error for password input */}
          <p className="text-red-600">{formErrors.password}</p>
          {/* Signup button */}
          <button
            disabled={loading}
            className="w-full px-5 py-2 border-none bg-[#D185FF] text-white rounded-md cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center sweet-loading">
                <h1>Loading</h1>
                <BeatLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <div className="font-bold">Sign Up</div>
            )}
          </button>
          {/* Login link */}
          <p>
            Already have an account?
            <Link to="/sign-in" className="ml-2 text-[#D185FF]">
              Log in
            </Link>
          </p>
        </form>
      </div>
      {/* Notification component */}
      <Notification />
    </div>
  );
};

export default Signup;
