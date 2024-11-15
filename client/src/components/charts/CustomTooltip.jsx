import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-stone-900 text-white rounded-md shadow-lg">
                <p className="font-semibold mb-2">{label}</p>
                {payload.map((entry, index) => {
                    return (
                        <p key={index} className="text-sm">
                            <span
                                style={{
                                    color: entry.fill || entry.payload.fill,
                                }}
                            >
                                {entry.name}:
                            </span>{" "}
                            {entry.value}
                        </p>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
