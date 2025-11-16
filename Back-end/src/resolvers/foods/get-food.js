import { foodModel } from "../../model/food-model.js";

export const getFood = async (req, res) => {
  const dbFoods = await foodModel.find().populate(`category`);

  res.status(200).json(dbFoods);
};
