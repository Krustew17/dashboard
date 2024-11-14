import React from "react";

const TableHead = ({ tableHead, onAddNewClick }) => {
    return (
        <thead className="text-xs uppercase  bg-stone-700 text-stone-400">
            <tr>
                {tableHead &&
                    tableHead.map((head) => (
                        <th scope="col" className="px-6 py-3" key={head}>
                            {head}
                        </th>
                    ))}
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
                {(onAddNewClick && (
                    <th scope="col" className="px-6 py-3">
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white  px-4 py-2 rounded-md color-white"
                            onClick={onAddNewClick}
                        >
                            Create
                        </button>
                    </th>
                )) || (
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Delete</span>
                    </th>
                )}
            </tr>
        </thead>
    );
};
export default TableHead;
