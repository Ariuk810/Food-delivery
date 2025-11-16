import { categoryModel } from "../../model/category-model.js";

export const deleteCategory = async (req, res) => {
  const deletedCategory = req.body;

  await categoryModel.findByIdAndDelete(deletedCategory.id);
  res.send("Delete category succesfully");
};
