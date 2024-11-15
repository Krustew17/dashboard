import React, { useState, useEffect } from "react";
import { FaUserAlt, FaSignInAlt, FaEye } from "react-icons/fa";
import Nav from "../components/Navbar";
import requester from "../common/requester";
import apiEndpoints from "../config/apiEndpoints";
import LineChartComponent from "../components/charts/LineChart";
import BarChartComponent from "../components/charts/BarChart";
import useWindowSize from "../components/hooks/useWindowSize";
import PieChartComponent from "../components/charts/PieChart";
import LoginsCard from "../components/LoginsCard";

const AnalyticsPage = () => {
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [loginCount, setLoginsCount] = useState(0);
    const [registersData, setRegistersData] = useState(0);
    const [mostViewedPage, setMostViewedPage] = useState("");
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
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

    const fetchLoginsCount = async (timeframe) => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.loginsCount.url}${
                    timeframe ? `?timeframe=${timeframe}` : ""
                }`,
                {
                    method: apiEndpoints.metrics.loginsCount.method,
                }
            );
            setLoginsCount(responseJson.loginsCount);
        } catch (error) {
            console.error("Error fetching logins count:", error);
        }
    };

    const fetchRegistersCount = async (timeframe) => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.registersCount.url}${
                    timeframe ? `?timeframe=${timeframe}` : ""
                }`,
                {
                    method: apiEndpoints.metrics.registersCount.method,
                }
            );
            setRegistersData(responseJson.registersCount);
        } catch (error) {
            console.error("Error fetching registers count:", error);
        }
    };

    const fetchBarChartData = async (timeframe) => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.rolesActivity.url}${
                    timeframe ? `?timeframe=${timeframe}` : ""
                }`,
                {
                    method: apiEndpoints.metrics.rolesActivity.method,
                }
            );
            setBarChartData(responseJson.groupedLogs);
        } catch (error) {
            console.error("Error fetching registers count:", error);
        }
    };

    const fetchMostViewedPage = async () => {
        try {
            const { responseJson } = await requester(
                apiEndpoints.metrics.mostViewedPage.url,
                {
                    method: apiEndpoints.metrics.mostViewedPage.method,
                }
            );
            setMostViewedPage(responseJson.mostViewedPage.page);
        } catch (error) {
            console.error("Error fetching most viewed page:", error);
        }
    };

    const fetchPageViews = async (timeframe) => {
        try {
            const { responseJson } = await requester(
                `${apiEndpoints.metrics.pageViewsCount.url}${
                    timeframe ? `?timeframe=${timeframe}` : ""
                }`,
                {
                    method: apiEndpoints.metrics.pageViewsCount.method,
                }
            );
            console.log(responseJson);
            setPieChartData(responseJson.pageViewsCount);
        } catch (error) {
            console.error("Error fetching page views:", error);
        }
    };

    const handleTimeframeChange = (timeframe, type) => {
        console.log(timeframe, type);
        switch (type) {
            case "loginsCount":
                fetchLoginsCount(timeframe);
                break;
            case "registersCount":
                fetchRegistersCount(timeframe);
                break;
            case "barChart":
                fetchBarChartData(timeframe);
                break;
            case "pieChart":
                fetchPageViews(timeframe);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        fetchLoginsCount();
        fetchActiveUsers();
        fetchRegistersCount();
        fetchBarChartData();
        fetchMostViewedPage();
        fetchPageViews();
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
                    <LoginsCard
                        loginCount={loginCount}
                        onTimeFrameChange={(timeframe) =>
                            handleTimeframeChange(timeframe, "loginsCount")
                        }
                    />
                    <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-white flex items-center space-x-4">
                        <FaEye className="text-indigo-500 text-3xl" />
                        <div>
                            <h3 className="text-lg font-semibold">
                                Most Viewed Page
                            </h3>
                            <p className="text-2xl capitalize">
                                {mostViewedPage}
                            </p>
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
                <div className="flex w-full flex-wrap justify-center gap-4 px-8">
                    <PieChartComponent
                        data={pieChartData}
                        title={"Page Views Count (Last 7 days)"}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
