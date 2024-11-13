import React from "react";

const TABLE_HEAD = [
    "ID",
    "Username",
    "Role",
    "Status",
    "Last Login",
    "Created At",
];

const UsersTableHead = () => {
    return (
        <thead className="text-xs uppercase  bg-stone-700 text-stone-400">
            <tr>
                {TABLE_HEAD.map((head) => (
                    <th scope="col" className="px-6 py-3" key={head}>
                        {head}
                    </th>
                ))}
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
    );
};
export default UsersTableHead;
