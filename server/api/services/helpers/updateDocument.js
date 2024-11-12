import validStatuses from "../../../config/documentStatuses.js";
import db from "../../../models/index.js";

const Document = db.document;

export default async function updateDocument(id, data) {
    const document = await Document.findByPk(id);

    if (!document) {
        throw new Error("something went wrong.");
    }
    if (data.status && !validStatuses.includes(data.status)) {
        throw new Error("invalid status.");
    }

    await document.update(data);
    await document.save();

    return document.dataValues;
}
