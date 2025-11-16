import express from "express";
import { getCategory } from "../resolvers/categorys/get-category.js";
import { createCategory } from "../resolvers/categorys/create-category.js";
import { updateCategory } from "../resolvers/categorys/update-category.js";
import { deleteCategory } from "../resolvers/categorys/delete-category.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.put("/", updateCategory);
categoryRouter.delete("/", deleteCategory);
