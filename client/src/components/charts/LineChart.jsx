import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const LineChartComponent = ({
    width,
    height,
    data,
    dataKeyX,
    dataKeyY,
    title,
}) => {
    return (
        <div className="w-full md:w-[48%] bg-stone-800 p-2 px-4 md:p-6 rounded-lg shadow-lg">
            <div className="flex justify-between mb-2">
                <h3 className="md:text-xl font-semibold text-white mb-4">
                    {title}
                </h3>
            </div>
            <ResponsiveContainer width={width} height={height}>
                <AreaChart
                    data={data}
                    margin={{ top: 0, right: 0, left: -40, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey={dataKeyX} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey={dataKeyY}
                        fill="#8884d8"
                        stroke="#8884d8"
                    />
                    <Bar dataKey="name" barSize={25} fill="#413ea0" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
export default LineChartComponent;
