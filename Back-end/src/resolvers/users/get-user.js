import { userModel } from "../../model/user-model.js";

export const getUsers = async (req, res) => {
  const dbUsers = await userModel.find();

  res.status(200).json(dbUsers);
};
