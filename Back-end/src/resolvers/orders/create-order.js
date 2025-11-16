import { orderModel } from "../../model/order-model.js";

export const createOrder = async (req, res) => {
  const newOrder = req.body;

  await orderModel.create(newOrder);

  res.status(200).json("success");
};
