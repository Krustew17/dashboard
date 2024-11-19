import React, { useEffect, useState } from "react";
import requester from "../../common/requester";
import apiEndpoints from "../../config/apiEndpoints";

const DeviceManageModal = ({ isOpen, onClose, username }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchDevices();
        }
    }, [isOpen]);

    const fetchDevices = async () => {
        try {
            setLoading(true);
            setError(null);
            const { response, responseJson } = await requester(
                apiEndpoints.devices.list.url,
                {
                    method: "POST",
                    body: { username },
                }
            );
            if (response.ok) {
                setDevices(responseJson.devices);
            } else {
                setError("Failed to load devices.");
            }
        } catch (error) {
            setError("An error occurred while fetching devices.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (deviceId) => {
        try {
            const { response } = await requester(
                `${apiEndpoints.devices.delete.url}/${deviceId}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                setDevices((prevDevices) =>
                    prevDevices.filter((device) => device.id !== deviceId)
                );
            } else {
                setError("Failed to delete device.");
            }
        } catch (error) {
            setError("An error occurred while deleting device.");
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-scroll sm:overflow-hidden">
                <div className="bg-stone-800 p-4 rounded-md shadow-md w-[90%] max-w-lg">
                    <h2 className="text-lg font-bold mb-4">Your Devices</h2>
                    {loading && <p>Loading devices...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <ul className="space-y-2">
                            {devices.map((device, index) => {
                                const deviceInfo = JSON.parse(
                                    device.deviceInfo
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
                    <button
                        onClick={onClose}
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    );
};
export default DeviceManageModal;
