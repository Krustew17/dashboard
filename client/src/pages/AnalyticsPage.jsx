import React, { useState, useEffect } from "react";
import { FaUserAlt, FaSignInAlt, FaEye } from "react-icons/fa";
import Nav from "../components/Navbar";
import requester from "../common/requester";
import apiEndpoints from "../config/apiEndpoints";
import LineChartComponent from "../components/charts/LineChart";
import BarChartComponent from "../components/charts/BarChart";
import useWindowSize from "../components/hooks/getScreenSize";

const AnalyticsPage = () => {
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [loginCount, setLoginsCount] = useState(0);
    const [registersData, setRegistersData] = useState(0);
    const [mostViewedPage, setMostViewedPage] = useState("");
    const [barChartData, setBarChartData] = useState([]);
    const windowSize = useWindowSize();
    const chartHeight = windowSize.width < 1024 ? 200 : 300;

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

    const fetchRegistersCount = async () => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.registersCount.url}?timeframe=1m`,
                {
                    method: apiEndpoints.metrics.registersCount.method,
                }
            );
            setRegistersData(responseJson.registersCount);
        } catch (error) {
            console.error("Error fetching registers count:", error);
        }
    };

    const fetchBarChartData = async () => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.rolesActivity.url}?timeframe=1w`,
                {
                    method: apiEndpoints.metrics.rolesActivity.method,
                }
            );
            setBarChartData(responseJson.groupedLogs);
        } catch (error) {
            console.error("Error fetching registers count:", error);
        }
    };

    useEffect(() => {
        fetchLoginsCount();
        fetchActiveUsers();
        fetchRegistersCount();
        fetchBarChartData();
        setMostViewedPage("Home Page");
    }, []);

    return (
        <div>
            <Nav />
            <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-white flex items-center space-x-4">
                        <FaUserAlt className="text-indigo-500 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">
                                Active Users
                            </h3>
                            <p className="text-2xl">{activeUsersCount}</p>
                        </div>
                    </div>
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-white flex items-center space-x-4">
                        <FaSignInAlt className="text-indigo-500 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">
                                Monthly Logins
                            </h3>
                            <p className="text-2xl">{loginCount}</p>
                        </div>
                    </div>
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-white flex items-center space-x-4">
                        <FaEye className="text-indigo-500 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">
                                Most Viewed Page
                            </h3>
                            <p className="text-2xl">{mostViewedPage}</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-wrap justify-between gap-4 px-8">
                    <LineChartComponent
                        width={"100%"}
                        height={chartHeight}
                        data={registersData}
                        dataKeyX="date"
                        dataKeyY="registrations"
                        title={"Daily Registrations (Last 7 Days)"}
                    />
                    <BarChartComponent
                        width={"100%"}
                        height={chartHeight}
                        data={barChartData}
                        dataKeyX="date"
                        title={"Daily Role Actions (Last 7 days)"}
                    />
                </div>

                <div className="bg-stone-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-white">
                        Other Stats
                    </h3>
                    <p className="text-white">
                        Additional analytics data can go here!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
