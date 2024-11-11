import db from "../../models/index.js";

const User = db.user;

const getUser = async (req, res) => {
  res.status(200);
};

export default { getUser };
