import { foodModel } from "../../model/food-model.js";

export const deleteFood = async (req, res) => {
  const deletedFood = req.body;

  await foodModel.findByIdAndDelete(deletedFood.id);
  res.send("Delete food succesfully!!");
};
