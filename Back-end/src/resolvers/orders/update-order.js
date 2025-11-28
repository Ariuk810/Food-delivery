import { orderModel } from "../../model/order-model.js";

export const updateOrder = async (req, res) => {
  const updatedOrder = req.body;

  await orderModel.findByIdAndUpdate(updatedOrder.id, {
    status: updatedOrder.status,
  });
  res.send("Updated successfully");
};
