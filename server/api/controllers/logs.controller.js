import logsService from "../services/logs.service.js";

export const getAllLogs = async (req, res) => {
    return logsService.getAllLogs(req, res);
};

export const trackRoute = async (req, res) => {
    return logsService.saveViewedRoute(req, res);
};
