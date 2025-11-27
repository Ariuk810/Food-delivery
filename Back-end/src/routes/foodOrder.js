import express from "express";
import { getOrder } from "../resolvers/orders/get-order.js";
import { createOrder } from "../resolvers/orders/create-order.js";
import { updateOrder } from "../resolvers/orders/update-order.js";
import { deleteOrder } from "../resolvers/orders/delete-order.js";
import { getOrderByUserId } from "../resolvers/orders/get-order-by-user.js";

export const orderRouter = express.Router();

orderRouter.get("/", getOrder);
orderRouter.get("/userId", getOrderByUserId);
orderRouter.post("/", createOrder);
orderRouter.put("/", updateOrder);
orderRouter.delete("/", deleteOrder);
