import jwt from "jsonwebtoken";
import { userModel } from "../../model/user-model.js";
export const getUserById = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = jwt.verify(token, "secret key");
  const users = await userModel.findById({ _id: id });

  res.status(200).json(users);
};
