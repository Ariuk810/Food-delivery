import { userModel } from "../../model/user-model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const newUser = req.body;
  const password = newUser.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.create({
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    password: hashedPassword,
  });
  res.status(200).json("success");
};
