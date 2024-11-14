import UAParser from "ua-parser-js";

const getDeviceInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();

    return {
        deviceType: result.device.type || "Desktop", // "mobile", "tablet", "desktop"
        deviceModel: result.device.model || "N/A", // Model name, if available (for mobile devices)
        browser: result.browser.name || "Unknown", // Browser name
        browserVersion: result.browser.version || "Unknown", // Browser version
        os: result.os.name || "Unknown", // Operating system
        osVersion: result.os.version || "Unknown", // OS version
    };
};

export default getDeviceInfo;
