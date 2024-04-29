import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    marginTop: "5px",
    borderColor: "red",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home page after successful sign-in
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center flex-1 gap-5 ">
        <h2>Welcome back</h2>
        <form
          action="submit"
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-5 "
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className=" px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <button
            disabled={loading}
            className=" w-full px-5 disabled:cursor-not-allowed disabled:bg-[#1f8ff19c] py-2 border-none bg-[#1f8ef1] text-white rounded-md cursor-pointer "
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1 sweet-loading">
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
              "Sign In"
            )}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signin;
