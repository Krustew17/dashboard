import React from "react";
const TableRow = ({
    entity,
    entityProps,
    entityStatusClasses,
    onEditClick,
    onDeleteClick,
}) => {
    const updatedByUsername = (propValue) => {
        if (propValue) return propValue.username || "N/A";
    };

    const properDates = (propValue) => {
        return propValue ? new Date(propValue).toLocaleString() : "N/A";
    };

    const propDate = (propValue) => {
        return (
            propValue === "lastLogin" ||
            propValue === "createdAt" ||
            propValue === "updatedAt"
        );
    };

    return (
        <tr className="border-b bg-stone-900 dark:border-gray-800  hover:bg-stone-600">
            {entityProps.map((prop) => (
                <td
                    key={prop}
                    className={`px-6 py-4 text-gray-200 
                     ${
                         prop === "role" ? "font-semibold" : ""
                     } ${entityStatusClasses(entity[prop])} `}
                >
                    {prop === "updatedBy"
                        ? updatedByUsername(entity[prop])
                        : propDate(prop)
                        ? entity[prop]
                            ? properDates(entity[prop])
                            : "N/A"
                        : entity[prop] || "N/A"}
                </td>
            ))}
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
export default TableRow;
