import React from "react";
import {
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const productSales = [
    {
        name: "Jan",
        product1: 4000,
        product2: 2400,
    },
    {
        name: "Feb",
        product1: 3000,
        product2: 2210,
    },
    {
        name: "Mar",
        product1: 2000,
        product2: 2290,
    },
    {
        name: "Apr",
        product1: 2780,
        product2: 2000,
    },
    {
        name: "May",
        product1: 1890,
        product2: 2181,
    },
    {
        name: "Jun",
        product1: 2390,
        product2: 2500,
    },
    {
        name: "Jul",
        product1: 2390,
        product2: 2500,
    },
];

const CombinedChartComponent = () => {
    return (
        <ResponsiveContainer width={400} height={200}>
            <AreaChart data={productSales}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="product1"
                    fill="#8884d8"
                    stroke="#8884d8"
                />
                <Bar dataKey="name" barSize={25} fill="#413ea0" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CombinedChartComponent;
