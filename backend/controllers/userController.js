import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import hashingPassword from "../utils/hashingPassword.js";

// Registering a New User
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please, fill all the inputs");
  }

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    res.status(400).send("User already exist.");
  }

  const securedPassword = await hashingPassword(password);

  const newUser = new User({ username, email, password: securedPassword });
  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login a Existing User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please, fill all the inputs");
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400).json({ message: "User doesn't exist, register first" });
  } else {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      generateToken(res, existingUser._id);
      res.status(200).json({
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        message: "Login Successful",
      });
      return;
      //Exit the function after loging in
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }
  }
});

// Logout the user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt-eComAppJWT", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    sameSite: "strict",
  });
  res.status(201).json({
    message: "Logged out successfully",
  });
});

// Get Current user Profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// Update logged user profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // const existingUser = await User.findOne(req.user.email);
  // console.log("Old Password: ",req.user);

  if (user) {
    //Setting new username provided by user
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // const isPreviousPasswordValid = await bcrypt.compare(existingUser.password, req.body.oldpassword);

      const encrytedPass = await hashingPassword(req.body.password);
      // console.log("Hashed Password: ",encrytedPass)
      user.password = encrytedPass;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      message: "Profile updated",
    });
  } else {
    res.status(404);
    throw new Error("User doesn't exist.");
  }
});

// Admin: Get all the users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Not found, Check again");
  }
});

// Admin: Delete user by ID
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete this user");
    }

    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Admin: Get specific user by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.email,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// Admin: Update user by ID
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user._id) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    //   user.isAdmin = Boolean(req.body.isAdmin);

    if (req.body.password) {
      // const securedPassword = await hashingPassword(req.body.password);
      // user.password = securedPassword;
      return res.status(401).json({
        message: "Admin can't change user's password.",
      });
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      message: "User profile updated.",
    });
  } else {
    res.status(404);
    throw new Error("User doesn't exist.");
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
