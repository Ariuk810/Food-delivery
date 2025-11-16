import { foodModel } from "../../model/food-model.js";

export const updateFood = async (req, res) => {
  const updatedFood = req.body;

  await foodModel.findByIdAndUpdate(updatedFood.id, {
    foodName: updatedFood.foodName,
    price: updatedFood.price,
    image: updatedFood.image,
  });
  res.send("Food updated successfully!");
};
