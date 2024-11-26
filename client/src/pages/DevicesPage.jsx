import React, { useState, useEffect } from "react";
import apiEndPoints from "../config/apiEndpoints";
import requester from "../common/requester";
import { useSelector } from "react-redux";
import Nav from "../components/Navbar";

const DevicesPage = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDevices = async () => {
            setLoading(true);
            setError("");

            try {
                const { response, responseJson } = await requester(
                    apiEndPoints.devices.list.url,
                    {
                        method: "POST",
                        body: { username: userInfo.username },
                    }
                );

                if (response.ok) {
                    console.log(responseJson);
                    setDevices(responseJson.devices);
                } else {
                    setError("Failed to load devices.");
                }
            } catch (err) {
                setError(
                    err.message || "An error occurred while fetching devices."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    const handleDelete = async (deviceId) => {
        try {
            const { response } = await requester(
                `${apiEndPoints.devices.delete.url}/${deviceId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete device");
            }

            setDevices(devices.filter((device) => device.id !== deviceId));
        } catch (err) {
            alert(
                err.message || "An error occurred while deleting the device."
            );
        }
    };

    return (
        <div>
            <Nav />
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-700 opacity-30 blur-3xl rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>
                <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-blue-700 opacity-25 blur-2xl rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400 opacity-25 blur-3xl rounded-full"></div>
                <div className="absolute top-2/4 right-3/4 w-64 h-64 bg-indigo-600 opacity-25 blur-3xl rounded-full"></div>
            </div>
            <div className="fixed w-full mx-auto h-full bg-opacity-50 flex justify-center items-center z-50 overflow-scroll sm:overflow-hidden">
                <div className="bg-stone-800 p-4 rounded-md shadow-md w-[90%] max-w-lg">
                    <h2 className="text-lg font-bold mb-4">Your Devices</h2>
                    {!devices.length && (
                        <p className="text-white">
                            No devices found for this user.
                        </p>
                    )}

                    {loading && <p>Loading devices...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <ul className="space-y-2">
                            {devices.map((device, index) => {
                                const deviceInfo = JSON.parse(
                                    device.deviceInfo || "{}"
                                );
                                return (
                                    <li
                                        key={device.id || index}
                                        className="p-2 w-full border border-stone-600 flex justify-between items-center"
                                    >
                                        <div className="flex flex-col space-y-1">
                                            <p>
                                                <strong>Device Type:</strong>{" "}
                                                {deviceInfo.deviceType ||
                                                    "Unknown"}
                                            </p>
                                            <p>
                                                <strong>Device Model:</strong>{" "}
                                                {deviceInfo.deviceModel ||
                                                    "Unknown"}
                                            </p>
                                            <p>
                                                <strong>Device OS:</strong>{" "}
                                                {deviceInfo.os || "Unknown"}
                                            </p>
                                            <p>
                                                <strong>Browser:</strong>{" "}
                                                {deviceInfo.browser ||
                                                    "Unknown"}
                                            </p>
                                            <p>
                                                <strong>
                                                    Browser Version:
                                                </strong>{" "}
                                                {deviceInfo.browserVersion ||
                                                    "Unknown"}
                                            </p>
                                            <p>
                                                <strong>Last Login:</strong>{" "}
                                                {new Date(
                                                    device.lastLogin
                                                ).toLocaleString() || "Unknown"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleDelete(device.id)
                                            }
                                            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DevicesPage;
