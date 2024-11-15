import { FaSignInAlt } from "react-icons/fa";
import TimeframeComponent from "./TimeframeComponent";

const LoginsCard = ({ loginCount, onTimeFrameChange }) => {
    return (
        <div className="bg-stone-800 p-6 rounded-lg shadow-lg text-white flex justify-between items-center space-x-4">
            <div className="flex gap-2 items-center">
                <FaSignInAlt className="text-indigo-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">Logins</h3>
                    <p className="text-2xl">{loginCount}</p>
                </div>
            </div>
            <TimeframeComponent onTimeFrameChange={onTimeFrameChange} />
        </div>
    );
};

export default LoginsCard;
