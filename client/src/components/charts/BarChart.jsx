import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const BarChartComponent = ({ width, height, data, dataKeyX, title }) => {
    return (
        <div className="w-full md:w-[48%] bg-stone-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
            <ResponsiveContainer width={width} height={height}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey={dataKeyX} />
                    <YAxis />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#362f2d", opacity: 0.3 }}
                    />
                    <Legend />
                    <Bar dataKey="admin" fill="#716aeb" barSize={30} />
                    <Bar dataKey="updater" fill="#af97cf" barSize={30} />
                    <Bar dataKey="viewer" fill="pink" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
