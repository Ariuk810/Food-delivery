import { orderModel } from "../../model/order-model.js";

export const getOrder = async (req, res) => {
  const dbOrders = await orderModel.find().populate([
    "user",
    "foodOrderItems.food",
    {
      path: "foodOrderItems.food",
      populate: "category",
    },
  ]);

  res.status(200).json(dbOrders);
};
