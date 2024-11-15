import metricsService from "./../services/metrics.service.js";

export const getActiveUserCount = (req, res) => {
    return metricsService.getActiveUserCount(req, res);
};

export const getLoginsCount = (req, res) => {
    return metricsService.getLoginsCount(req, res);
};

export const getUserRegisterCount = (req, res) => {
    return metricsService.getUserRegisterCount(req, res);
};

export const getRolesActivity = (req, res) => {
    return metricsService.getRolesActivity(req, res);
};

export const getMostViewedPage = (req, res) => {
    return metricsService.mostViewedPage(req, res);
};

export const getPageViewsCount = (req, res) => {
    return metricsService.pageViewsCount(req, res);
};
