import express from "express";
import { router } from "./routes/users.js";
import mongoose from "mongoose";
import { foodRouter } from "./routes/foods.js";
import { categoryRouter } from "./routes/categorys.js";
import { orderRouter } from "./routes/foodOrder.js";
import cors from "cors";
const app = express();
const PORT = 1000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", router);
app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

mongoose
  .connect("mongodb+srv://Aabii:Aabii081010@aabii.lorchjo.mongodb.net/")
  .then(() => console.log("Connected!"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
