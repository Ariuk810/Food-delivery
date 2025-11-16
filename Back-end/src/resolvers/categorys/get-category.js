import { categoryModel } from "../../model/category-model.js";

export const getCategory = async (req, res) => {
  const dbCategorys = await categoryModel.find();

  res.status(200).json(dbCategorys);
};
