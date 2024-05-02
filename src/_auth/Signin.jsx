import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import Notification from "../components/Notification";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
      toast.success("Signed In");

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setFormErrors({ message: error.message }); // Set form error message
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center text-white px-28">
        <div
          className="w-full h-full flex-1 bg-no-repeat bg-center"
          style={{ backgroundImage: `url('/Illustration.png')` }}
        ></div>

        <div className="flex flex-col items-center gap-5 w-fit px-12 py-8">
          <div className="text-4xl flex items-center font-bold">
            <img
              src="/logo.gif"
              alt=""
              className="bg-[#D185FF] w-16 h-12 rounded-md"
            />
            <h1>
              <span className="inline-block px-0 mx-0 text-white">app</span>
            </h1>
          </div>
          <h2>Welcome back</h2>
          <form
            action="submit"
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center gap-5"
          >
            <input
              type="text"
              placeholder="Email"
              name="email"
              className={`px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white flex-shrink-0 rounded-md ${
                formErrors.email && "border-red-500" // Apply red border if there's an error
              }`}
            />
            {formErrors.email && ( // Display error message if there's an error
              <p className="text-red-600">{formErrors.email}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="false"
              className={`px-10 py-3 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md ${
                formErrors.password && "border-red-500" // Apply red border if there's an error
              }`}
            />
            {formErrors.password && ( // Display error message if there's an error
              <p className="text-red-600">{formErrors.password}</p>
            )}
            <button
              disabled={loading}
              className="w-full px-5 disabled:cursor-not-allowed py-2 border-none bg-[#D185FF] text-white rounded-md cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1 sweet-loading">
                  <h1 className="font-bold">Loading</h1>
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
                <div className="font-bold">Sign In</div>
              )}
            </button>
          </form>
          <p className="w-full text-sm text-white">
            Don't have an account?
            <Link to="/sign-up" className="ml-1 text-[#D185FF]">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Notification />
    </>
  );
};

export default Signin;
