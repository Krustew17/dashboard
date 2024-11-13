import React from "react";
const UsersTableRow = ({ user, onEditClick, onDeleteClick }) => {
    return (
        <tr className="border-b bg-stone-900 dark:border-gray-800  hover:bg-stone-600">
            <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap text-gray-100"
            >
                {user.id}
            </th>
            <td className="px-6 py-4 text-gray-200">{user.username}</td>
            <td className="px-6 py-4 text-gray-200 font-semibold">
                {user.role || "N/A"}
            </td>
            <td
                className={`px-6 py-4 font-semibold ${
                    user.status === "active"
                        ? "text-green-500"
                        : user.status === "inactive"
                        ? "text-red-500"
                        : "text-yellow-500"
                }`}
            >
                {user.status}
            </td>
            <td className="px-6 py-4 text-gray-200">
                {user.lastLogin || "N/A"}
            </td>
            <td className="px-6 py-4 text-gray-200">{user.createdAt}</td>
            <td className="px-6 py-4 text-right">
                <button
                    onClick={onEditClick}
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-gray-300 font-bold py-2 px-4 rounded"
                >
                    Edit
                </button>
            </td>
            <td className="px-6 py-4 text-center">
                <button
                    onClick={onDeleteClick}
                    className="bg-red-600 hover:bg-red-700 text-gray-300 font-bold py-2 px-4 rounded"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
export default UsersTableRow;
