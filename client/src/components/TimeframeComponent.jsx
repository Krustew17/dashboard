import React, { useState } from "react";
import convertTimeframe from "../helpers/convertTimeframe";
import defaultTimeframe from "../constants/defaultTimeframe";

const TimeframeComponent = ({ onTimeFrameChange }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(
        convertTimeframe(defaultTimeframe)
    );

    const toggleDropdown = () => setDropdownVisible((prev) => !prev);

    const handleTimeFrameSelect = (timeFrame) => {
        setSelectedTimeFrame(convertTimeframe(timeFrame));
        setDropdownVisible(false);
        onTimeFrameChange(timeFrame);
    };

    return (
        <div className="relative">
            <button
                className="text-white px-4 py-2 ml-4 bg-indigo-600 rounded-md"
                onClick={toggleDropdown}
            >
                {selectedTimeFrame}
            </button>
            {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-40 bg-stone-900 text-white z-50 shadow-lg rounded-md">
                    <ul>
                        <li
                            className="px-4 py-2 cursor-pointer hover:bg-stone-700"
                            onClick={() => handleTimeFrameSelect("1d")}
                        >
                            Last 24 Hours
                        </li>
                        <li
                            className="px-4 py-2 cursor-pointer hover:bg-stone-700"
                            onClick={() => handleTimeFrameSelect("3d")}
                        >
                            Last 3 Days
                        </li>
                        <li
                            className="px-4 py-2 cursor-pointer hover:bg-stone-700"
                            onClick={() => handleTimeFrameSelect("1w")}
                        >
                            Last Week
                        </li>
                        <li
                            className="px-4 py-2 cursor-pointer hover:bg-stone-700"
                            onClick={() => handleTimeFrameSelect("1m")}
                        >
                            Last Month
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
export default TimeframeComponent;
