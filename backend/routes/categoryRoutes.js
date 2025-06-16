import express from "express";
import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/catergoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorisedAdmin, createCategory);

router
  .route("/:categoryId")
  .put(authenticate, authorisedAdmin, updateCategory)
  .delete(authenticate, authorisedAdmin, deleteCategory);

router.route("/categories").get(getAllCategories);

export default router;
