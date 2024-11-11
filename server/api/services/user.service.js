import db from "../../models/index.js";

const User = db.user;

const getUser = async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    status: req.body.status,
    role: req.body.role,
  });
  return res.status(200).json({ message: "User Created Successfully", user });
};

export default { getUser };
