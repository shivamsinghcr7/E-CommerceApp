import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { useProfileMutation } from "../../redux/api/usersApiSlice.js";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [oldpassword, setOldpassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password Mis-matched");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();

        console.log("Update User data", res);
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        navigate("/profile");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  // const verifyPassword = async (e) => {
  //   e.preventDefault();
  // };

  return (
    <section className="pl-[10rem] flex flex-wrap text-white">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

        <form
          onSubmit={updateProfileHandler}
          className="container w-[40rem] mt-[2rem]"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input p-4 border rounded-sm w-full bg-transparent text-pink-500"
              value={username}
              placeholder="Enter Name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-input p-4 border rounded-sm w-full bg-transparent text-pink-500"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Old Password */}
          {/* <div className="mb-4">
            <label
              htmlFor="oldpassword"
              className="block text-sm font-medium text-white mb-1"
            >
              Pervious Password
            </label>
            <input
              type="password"
              id="oldpassword"
              className="form-input p-4 border rounded-sm w-full bg-transparent text-pink-500"
              value={oldpassword}
              placeholder="Enter Old Password"
              onChange={(e) => setOldpassword(e.target.value)}
            />
          </div> */}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input p-4 border rounded-sm w-full bg-transparent text-pink-500"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input p-4 border rounded-sm w-full bg-transparent text-pink-500"
              value={confirmPassword}
              placeholder="Re-enter Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
            >
              Update
            </button>

            <Link
              to="/users-order"
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-600"
            >
              My Orders
            </Link>
          </div>
        </form>
        <div className="mt-3">{loadingUpdateProfile && <Loader />}</div>
      </div>
    </section>
  );
};

export default Profile;
