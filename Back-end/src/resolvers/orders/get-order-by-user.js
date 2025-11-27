import { orderModel } from "../../model/order-model.js";

export const getOrderByUserId = async (req, res) => {
  const userId = req.params.userId;
  const dbOrders = await orderModel.find({ user: userId }).populate([
    "user",
    "foodOrderItems.food",
    {
      path: "foodOrderItems.food",
      populate: "category",
    },
  ]);

  res.status(200).json(dbOrders);
};
