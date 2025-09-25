import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});
//export default mongoose.model("Category", categorySchema);
const Category = mongoose.model("Category", categorySchema);
export default Category;
