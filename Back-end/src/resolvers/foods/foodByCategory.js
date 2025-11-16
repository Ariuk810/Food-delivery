import { foodModel } from "../../model/food-model.js";

export const foodByCategory = async (req, res) => {
  const dbFoods = await foodModel
    .find({ category: req.params.categoryId })
    .populate(`category`);

  res.status(200).json(dbFoods);
};
