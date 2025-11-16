import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FoodOrderItem = new Schema({
  food: { type: Schema.ObjectId, require: true, ref: `food` },
  quantity: { type: Number, require: true },
});

const OrderSchema = new Schema({
  name: { type: String, require: true },
  user: { type: Schema.ObjectId, require: true, ref: `user` },
  foodOrderItems: [FoodOrderItem],
  status: {
    type: String,
    enum: ["PENDING", "CANCELED", "DELIVERED"],
  },
  totalPrice: { type: Number, require: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const orderModel = mongoose.model("order", OrderSchema);
