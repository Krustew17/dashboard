import timeFrames from "../constants/timeFrames";

const convertTimeframe = (timeframe) => {
    return timeFrames[timeframe];
};
export default convertTimeframe;
