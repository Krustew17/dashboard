import metricsService from "./../services/metrics.service.js";

export const getActiveUserCount = (req, res) => {
    return metricsService.getActiveUserCount(req, res);
};

export const getLoginsCount = (req, res) => {
    console.log(req);
    return metricsService.getLoginsCount(req, res);
};
