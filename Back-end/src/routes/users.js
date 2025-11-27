import express from "express";
import { getUsers } from "../resolvers/users/get-user.js";
import { createUser } from "../resolvers/users/create-user.js";
import { updateUser } from "../resolvers/users/update-user.js";
import { deleteUser } from "../resolvers/users/delete-user.js";
import { login } from "../resolvers/users/login.js";
import { getOrderByUserId } from "../resolvers/orders/get-order-by-user.js";
import { getUserById } from "../resolvers/users/get-user-id.js";

export const router = express.Router();

router.get("/", getUsers);

router.get("/me", getUserById);
router.post("/", createUser);
router.put("/", updateUser);
router.post("/login", login);
router.delete("/", deleteUser);
