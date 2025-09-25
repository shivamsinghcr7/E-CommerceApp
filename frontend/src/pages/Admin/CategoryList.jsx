import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import CategoryModal from "../../components/CategoryModal";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [setselectedCategory, setSetselectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { data: categories } = useGetAllCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required.");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${name} has been created.`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updateName) {
      toast.error("Category");
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      {/* <AdmninMenu />  */}
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />

        <br />
        <hr />

        <div className="flex-flex-wrap">
          {categories?.map((category) => (
            <div key={category._id} className="inline-flex">
              <button
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSetselectedCategory(category);
                    setUpdateName(category.name);
                  }
                }}
                className="bg-transparent border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 font-semibold"
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <CategoryModal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </CategoryModal>
      </div>
    </div>
  );
};

export default CategoryList;
