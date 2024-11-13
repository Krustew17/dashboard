import validTimeFrames from "../../../config/timeFrames.js";

const validateTimeframe = (timeframe) => {
    if (!validTimeFrames[timeframe]) {
        throw new Error("invalid timeframe.");
    }
    return validTimeFrames[timeframe];
};

export default { validateTimeframe };
