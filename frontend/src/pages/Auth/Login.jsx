import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import { Images } from "../../redux/constants.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap text-white w-full">
      <div className="mr-[4rem] mt-[5rem] w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium  ">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full bg-transparent text-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full bg-transparent text-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] font-medium"
          >
            {isLoading ? "Loging In..." : "Login"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            New Customer ?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="mr-4 mt-[9rem] rounded-2xl w-2/5 px-4 py-4 border bg-black hover:bg-pink-500">
        <img
          src={Images.background_1}
          alt="bg-image"
          width="500px"
          className="rounded-2xl w-full border-pink-500 border-2"
        />
      </div>
    </section>
  );
};

export default Login;
