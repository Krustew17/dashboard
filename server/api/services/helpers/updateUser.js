import db from "../../../models/index.js";

const User = db.user;

export default async function updateUser(id, data) {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error("something went wrong.");
    }

    await user.update(data);
    await user.save();

    return user.dataValues;
}
