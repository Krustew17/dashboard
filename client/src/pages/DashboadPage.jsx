import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import apiEndpoints from "../config/apiEndpoints";
import requester from "../common/requester";
import Chart from "../components/charts/Chart";

const DashboardPage = () => {
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [loginsCount, setLoginsCount] = useState(0);

    const fetchActiveUsers = async () => {
        try {
            const { responseJson } = await requester(
                apiEndpoints.metrics.activeUsers.url,
                {
                    method: apiEndpoints.metrics.activeUsers.method,
                }
            );
            setActiveUsersCount(responseJson.activeUsersCount);
        } catch (error) {
            console.error("Error fetching active users:", error);
        }
    };

    const fetchLoginsCount = async () => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.loginsCount.url}?timeframe=1m`,
                {
                    method: apiEndpoints.metrics.loginsCount.method,
                }
            );
            setLoginsCount(responseJson.loginsCount);
        } catch (error) {
            console.error("Error fetching logins count:", error);
        }
    };

    useEffect(() => {
        fetchLoginsCount();
        fetchActiveUsers();
    }, []);

    return (
        <div>
            <Nav />
            <div className="flex flex-1 mt-2 px-4 gap-2 w-full">
                <div className="bg-stone-800 rounded-xl max-w-[250px] w-full p-4">
                    <h1 className="text-2xl">Active Users</h1>
                    <div className="flex">
                        <h1 className="text-4xl">{activeUsersCount}</h1>
                    </div>
                </div>
                <div className="bg-stone-800 rounded-xl p-4 max-w-[300px] w-full">
                    <div className="flex justify-between">
                        <h1 className="text-2xl">Monthly Logins</h1>
                        <button>...</button>
                    </div>
                    <div className="flex">
                        <h1 className="text-4xl">{loginsCount}</h1>
                    </div>
                </div>
                <div>
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
