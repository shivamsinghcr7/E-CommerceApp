import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logoutCredentials } from "../../redux/features/auth/authSlice.js";

import "./Navigation.scss";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  // const closeSidebar = () => {
  //   setShowSidebar(false);
  // };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logoutCredentials());
      navigate("/login");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  return (
    // <div
    //   style={{ zIndex: 999 }}
    //   className={`${
    //     showSidebar ? "hidden" : "flex"
    //   } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
    // >
    //   <div className="flex flex-col justify-center space-y-4">
    //     <Link
    //       to="/"
    //       className="flex items-center transition-transform transform hover:translate-x-2"
    //     >
    //       <AiOutlineHome size={26} className="mr-2 mt-[3rem]" />
    //       <span className="hidden nav-item-name mt-[3rem]">HOME</span>
    //     </Link>

    //     <Link
    //       to="/shop"
    //       className="flex items-center transition-transform transform hover:translate-x-2"
    //     >
    //       <AiOutlineShopping size={26} className="mr-2 mt-[3rem]" />
    //       <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
    //     </Link>

    //     <Link
    //       to="/cart"
    //       className="flex items-center transition-transform transform hover:translate-x-2"
    //     >
    //       <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
    //       <span className="hidden nav-item-name mt-[3rem]">CART</span>
    //     </Link>

    //     <Link
    //       to="/favorite"
    //       className="flex items-center transition-transform transform hover:translate-x-2"
    //     >
    //       <FaRegHeart size={26} className="mr-2 mt-[3rem]" />
    //       <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
    //     </Link>
    //   </div>

    //   <ul>
    //     <li>
    //       <Link
    //         to="/login"
    //         className="flex items-center transition-transform transform hover:translate-x-2"
    //       >
    //         <AiOutlineLogin size={26} className="mr-2 mt-[3rem]" />
    //         <span className="hidden nav-item-name mt-[3rem]">Login</span>
    //       </Link>
    //     </li>

    //     <li>
    //       <Link
    //         to="/register"
    //         className="group flex items-center transition-transform transform hover:translate-x-2"
    //       >
    //         <AiOutlineUserAdd size={26} className="mr-2 mt-[3rem]" />
    //         <span className="nav-item-name opacity-0 group-hover:opacity-100 transition-all duration-300 mt-[3rem]">
    //           Register
    //         </span>
    //       </Link>
    //     </li>
    //   </ul>
    // </div>

    <div
      style={{ zIndex: 999 }}
      className={`group fixed top-0 left-0 h-screen bg-black text-white transition-all duration-300 ease-in-out 
              ${showSidebar ? "w-[15%]" : "w-[5%]"} 
              hover:w-[60%] sm:hover:w-[20%] md:hover:w-[17%]  flex flex-col justify-between p-4`}
    >
      <div className="flex flex-col space-y-4">
        <Link
          to="/"
          className="group flex items-center mt-12 transition-transform transform hover:translate-x-2"
        >
          <div className="min-w-[2.5rem] flex justify-center">
            <AiOutlineHome size={26} />
          </div>
          <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            HOME
          </span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <div className="min-w-[2.5rem] flex justify-center">
            <AiOutlineShopping size={26} className="mr-2" />
          </div>
          <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            SHOP
          </span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <div className="min-w-[2.5rem] flex justify-center">
            <AiOutlineShoppingCart size={26} className="mr-2" />
          </div>

          <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            CART
          </span>
        </Link>

        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <div className="min-w-[2.5rem] flex justify-center">
            <FaRegHeart size={26} className="mr-2" />
          </div>
          <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            FAVORITE
          </span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-8000 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-pink-500 font-semibold">
              {userInfo.username}
            </span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-600 text-white ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
                  >
                    Category
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
                  >
                    Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
              >
                Profile
              </Link>
            </li>

            <li>
              <Link
                onClick={logoutHandler}
                className="block px-4 py-2 transition-all duration-300 ease-in-out will-change-transform hover:scale-105 hover:bg-gray-500 hover:text-pink-500 hover:font-semibold"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <div className="min-w-[2.5rem] flex justify-center">
                <AiOutlineLogin size={26} className="mr-2" />
              </div>
              <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <div className="min-w-[2.5rem] flex justify-center">
                <AiOutlineUserAdd size={26} className="mr-2" />
              </div>
              <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Register
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
