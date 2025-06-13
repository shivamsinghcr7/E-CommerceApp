import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message.jsx";

const UsersList = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateUserHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error || error.message);
    }
  };

  const toggleEdit = (userid, username, email) => {
    setEditableUserId(userid);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const deleteUserHandler = async (userid) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(userid);
        window.location.reload();
      } catch (error) {
        toast.error(error?.data?.message || error.message || error.error);
      }
    }
  };

  const cancelEditHandler = async () => {
    try {
      setEditableUserId(null);
    } catch (error) {
      toast.error(error?.data?.message || error.message || error.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Admin Menu */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">NAME</th>
              <th className="px-4 py-2 text-left">EMAIL</th>
              <th className="px-4 py-2 text-left">ADMIN</th>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg bg-transparent text-pink-600"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                        />
                        <button
                          onClick={() => updateUserHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => cancelEditHandler()}
                          className="ml-2 bg-red-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaPowerOff />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="email"
                          className="w-full p-2 border rounded-lg bg-transparent text-pink-600 font-semibold"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                        />
                        <button
                          onClick={() => updateUserHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => cancelEditHandler()}
                          className="ml-2 bg-red-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaPowerOff />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteUserHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
