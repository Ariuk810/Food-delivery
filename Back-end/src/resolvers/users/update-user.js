import { userModel } from "../../model/user-model.js";

export const updateUser = async (req, res) => {
  const updatedUser = req.body;

  await userModel.findByIdAndUpdate(req.body.id, {
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
  });
  res.send("User updated successfully!");
};
