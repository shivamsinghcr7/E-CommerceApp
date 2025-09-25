import express from "express";

import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/catergoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorisedAdmin, createCategory);

router.route("/categories").get(getAllCategories); // static route

router
  .route("/:categoryId") // Dynamic route
  .put(authenticate, authorisedAdmin, updateCategory)
  .delete(authenticate, authorisedAdmin, deleteCategory)
  .get(getCategoryById);

export default router;

// Move /categories route above /:categoryId  --> Prevents Express from matching "categories" as an ID
