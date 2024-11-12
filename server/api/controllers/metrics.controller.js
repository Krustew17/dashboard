import metricsService from "./../services/metrics.service.js";

export const getLoginsCount = (req, res) => {
    return metricsService.getLoginsCount(req, res);
};

export const getActiveUserCount = (req, res) => {
    return metricsService.getActiveUserCount(req, res);
};
