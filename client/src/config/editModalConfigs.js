import { documentStatuses } from "../constants/documentStatuses.js";
import { userRoles } from "../constants/userRoles.js";
import { userStatuses } from "../constants/userStatuses.js";

export const editDocumentsModalConfig = [
    { key: "title", label: "Title", type: "text" },
    {
        key: "status",
        label: "Status",
        type: "select",
        options: Object.values(documentStatuses),
    },
];

export const editUsersModalConfig = [
    {
        key: "role",
        label: "Role",
        type: "select",
        options: Object.values(userRoles),
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        options: Object.values(userStatuses),
    },
];
