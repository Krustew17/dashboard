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
    const barSize = height > 220 ? 30 : 10;

    return (
        <div className="w-full md:w-[48%] bg-stone-800 p-2 md:p-6 rounded-lg shadow-lg">
            <h3 className="md:text-xl font-semibold text-white mb-4">
                {title}
            </h3>
            <ResponsiveContainer width={width} height={height}>
                <BarChart
                    data={data}
                    margin={{ top: 0, right: 0, left: -35, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey={dataKeyX} />
                    <YAxis />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#786c66", opacity: 0.3 }}
                    />
                    <Legend />
                    <Bar dataKey="admin" fill="#716aeb" barSize={barSize} />
                    <Bar dataKey="updater" fill="#af97cf" barSize={barSize} />
                    <Bar dataKey="viewer" fill="pink" barSize={barSize} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
