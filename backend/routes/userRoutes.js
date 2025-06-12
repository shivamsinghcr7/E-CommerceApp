import express from "express";

//controller
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/login", loginUser);   // This is also working
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorisedAdmin, getAllUsers);
router.route("/login").post(loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorisedAdmin, deleteUserById)
  .get(authenticate, authorisedAdmin, getUserById)
  .put(authenticate, authorisedAdmin, updateUserById);

export default router;
