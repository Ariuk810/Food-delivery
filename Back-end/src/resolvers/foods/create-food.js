import { foodModel } from "../../model/food-model.js";

export const createFood = async (req, res) => {
  const newFood = req.body;

  await foodModel.create({
    foodName: newFood.foodName,
    price: newFood.price,
    image: newFood.image,
    category: newFood.category,
    ingredients: newFood.ingredients,
  });
  res.status(200).json("success");
};
