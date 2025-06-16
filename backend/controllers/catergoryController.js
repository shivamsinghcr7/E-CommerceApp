import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import hashingPassword from "../utils/hashingPassword.js";
import { cleanCategoryName } from "../utils/validation.js";

/* 
    @desc: Create Category
    @method: POST
    @path: /api/category
*/
const createCategory = asyncHandler(async (req, res) => {
  try {
    let { name } = req.body;

    // if (typeof name !== "string" || !/^[A-Za-z\s]+$/.test(name.trim())) {
    //   return res
    //     .status(403)
    //     .json({ error: "Invalid Category. Only letters allowed." });
    // }
    // const cleanedName = name
    //   .trim() // Remove leading/trailing spaces
    //   .toLowerCase() // Convert entire string to lowercase
    //   .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
    // name = cleanedName;
    // name = cleanCategoryName(name);
    const { error, name: cleanedName } = cleanCategoryName(name);
    if (error) {
      return res.status(400).json({ error });
    }
    name = cleanedName;

    if (!name) {
      return res.json({ error: "Category name is required." });
    }

    const isExisting = await Category.findOne({ name });
    if (isExisting) {
      return res.status(404).json({ error: "Category already existing." });
    }

    const category = await new Category({ name }).save();
    res.status(201).json({
      message: `Category created`,
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Create category error",
      error: error,
    });
  }
});

/* 
    @desc: Update Category
    @method: PUT
    @path: /api/category:id
*/
const updateCategory = asyncHandler(async (req, res) => {
  let { name } = req.body;
  const { categoryId } = req.params;

  const category = await Category.findOne({ _id: categoryId });
  if (!category) {
    return res.status(404).json({
      message: "Category not found.",
    });
  }

  try {
    const { error, name: cleanedName } = cleanCategoryName(name);
    if (error) {
      return res.status(400).json({ error });
    }
    category.name = cleanedName;

    const updatedCategory = await category.save();
    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Update category error",
      error: error,
    });
  }
});

/* 
    @desc: Delete Category
    @method: DELETE
    @path: /api/category:id
*/
const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findOne({ _id: categoryId });
  if (!category) {
    return res.status(404).json({
      message: "Category not found.",
    });
  } else {
    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: `${category.name} deleted successfully.` });
  }
});

/* 
    @desc: Get All Category
    @method: GET
    @path: /api/category
*/
const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await Category.find({});
  if (categoryList) {
    res.status(200).json(categoryList);
  } else {
    res.status(404);
    throw new Error("Error in fetching list.");
  }
});



export { createCategory, updateCategory, deleteCategory, getAllCategories };
