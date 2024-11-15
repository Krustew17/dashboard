import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import apiEndpoints from "../config/apiEndpoints";
import requester from "../common/requester";
import Logs from "../components/Logs";

const DashboardPage = () => {
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [loginsCount, setLoginsCount] = useState(0);
    const [recentLogs, setRecentLogs] = useState([]);

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

    const fetchRecentLogs = async () => {
        try {
            const { responseJson } = await requester(
                apiEndpoints.logs.recent.url,
                {
                    method: apiEndpoints.logs.recent.method,
                }
            );
            setRecentLogs(responseJson.logs);
        } catch (error) {
            console.error("Error fetching recent logs:", error);
        }
    };

    useEffect(() => {
        fetchLoginsCount();
        fetchActiveUsers();
        fetchRecentLogs();
    }, []);

    return (
        <div>
            <Nav />
            <div>
                <div className="flex flex-col lg:flex-row mt-2 px-4 justify-between gap-2 w-full overflow-y-hidden">
                    <div className="flex lg:flex-row flex-col gap-2 w-full">
                        <div className="flex gap-2 w-full">
                            <div className="bg-stone-800 rounded-xl sm:max-w-[250px] max-h-[120px] w-full p-4">
                                <h1 className="text-2xl">Active Users</h1>
                                <div className="flex">
                                    <h1 className="text-4xl">
                                        {activeUsersCount}
                                    </h1>
                                </div>
                            </div>
                            <div className="bg-stone-800 rounded-xl p-4 sm:max-w-[300px] max-h-[120px] w-full">
                                <div className="flex justify-between">
                                    <h1 className="text-2xl">Monthly Logins</h1>
                                    <button>...</button>
                                </div>
                                <div className="flex">
                                    <h1 className="text-4xl">{loginsCount}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-stone-800 p-4 rounded-xl">
                            <CombinedChartComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
