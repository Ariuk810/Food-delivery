import { categoryModel } from "../../model/category-model.js";

export const createCategory = async (req, res) => {
  const newCategory = req.body;
  await categoryModel.create({
    categoryName: newCategory.categoryName,
    createdAt: newCategory.createdAt,
    updatedAt: newCategory.updatedAt,
  });
  res.status(200).json("Success");
};
