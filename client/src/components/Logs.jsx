import React from "react";
import apiEndpoints from "../config/apiEndpoints";
import calculateTimeAgo from "../helpers/calculateTimeAgo";
import useFetchEntity from "../components/hooks/useFetchEntity.jsx";
import validEntityTypes from "../constants/validEntityTypes.js";
const Logs = ({ logs, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            {logs &&
                logs.map((log) => {
                    return (
                        <li className="mb-2 px-4" key={log.id}>
                            <div className="items-center justify-between p-4 rounded-lg shadow-sm sm:flex dark:bg-stone-700 dark:border-stone-600">
                                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                                    {calculateTimeAgo(log.createdAt)}
                                </time>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                                    <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-stone-800 dark:text-gray-300">
                                        {log?.performedByUserData?.username ||
                                            log.targetUserData.username}
                                    </span>
                                    <span className="">{log.action}</span>

                                    {log?.performedByUserData && (
                                        <span
                                            className={`text-xs font-normal ml-2 px-2.5 py-0.5 rounded ${
                                                log.action ===
                                                "has deleted user"
                                                    ? "bg-red-800 "
                                                    : log.action ===
                                                      "has deleted document"
                                                    ? "bg-red-800"
                                                    : "bg-indigo-800"
                                            }`}
                                        >
                                            {log?.targetUserData?.username ||
                                                log?.targetUserData?.title ||
                                                ""}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
        </div>
    );
};
export default Logs;
