import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FoodSchema = new Schema({
  id: ObjectId,
  foodName: String,
  price: { type: Number, require: true },
  category: { type: Schema.ObjectId, require: true, ref: `category` },
  Image: { type: String, require: true },
  ingredients: { type: String, require: true },
  createdAt: { type: Date, require: true, default: Date.now },
  updatedAt: { type: Date, require: true, default: Date.now },
});

export const foodModel = mongoose.model("food", FoodSchema);
