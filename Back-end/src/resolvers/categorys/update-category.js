import { categoryModel } from "../../model/category-model.js";

export const updateCategory = async (req, res) => {
  const updateCategory = req.body;

  await categoryModel.findByIdAndUpdate(updateCategory.id, {
    categoryName: updateCategory.categoryName,
    createdAt: updateCategory.createdAt,
    updatedAt: updateCategory.updatedAt,
  });
  res.send("Category updated successfully!");
};
