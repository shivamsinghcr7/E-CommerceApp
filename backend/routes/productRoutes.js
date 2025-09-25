import express from "express";
import ExpressFormidable from "express-formidable";

// Authentications
import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

// Controllers
import {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductsById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorisedAdmin, ExpressFormidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductsById)
  .put(authenticate, authorisedAdmin, ExpressFormidable(), updateProduct)
  .delete(authenticate, authorisedAdmin, removeProduct);

// Reviews
router.route("/:id/reviews").post(authenticate, addProductReview);

export default router;
