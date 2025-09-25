import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Adding a new product
const addProduct = asyncHandler(async (req, res) => {
  try {
    // using req.fields as we're using fromidable and sending data from form-data
    const { name, brand, quantity, category, description, price } = req.fields;

    // Validations
    switch (true) {
      case !name:
        return res.json({ error: "Name is required." });
      case !brand:
        return res.json({ error: "Brand name is required." });
      case !quantity:
        return res.json({ error: "Quantity is required." });
      case !category:
        return res.json({ error: "Category is required." });
      case !description:
        return res.json({ error: "Description is required." });
      case !price:
        return res.json({ error: "Price is required." });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

// Udpating an existing product by id
const updateProduct = asyncHandler(async (req, res) => {
  try {
    // using req.fields as we're using fromidable and sending data from form-data
    const { name, brand, quantity, category, description, price } = req.fields;

    // Validations
    switch (true) {
      case !name:
        return res.json({ error: "Name is required." });
      case !brand:
        return res.json({ error: "Brand name is required." });
      case !quantity:
        return res.json({ error: "Quantity is required." });
      case !category:
        return res.json({ error: "Category is required." });
      case !description:
        return res.json({ error: "Description is required." });
      case !price:
        return res.json({ error: "Price is required." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await updatedProduct.save();
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

// Remove an existing product by id
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch all the products
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.status(200).json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch products by Id
const fetchProductsById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

// Fetch All products upto 12
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

// Add product review
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed.");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("No product found for review.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message);
  }
});

// Fetch top rated products
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message);
  }
});

// Fetch new products
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const newProducts = await Product.find({}).sort({ createdAt: -1 }).limit(4);
    res.json(newProducts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message);
  }
});

export {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductsById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
