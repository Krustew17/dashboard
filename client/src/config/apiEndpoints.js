const usersPrefix = "users";
const logsPrefix = "logs";
const metricsPrefix = "metrics";

const apiEndPoints = {
    users: {
        all: {
            url: usersPrefix,
            method: "GET",
        },
        update: {
            url: `${usersPrefix}/edit`,
            method: "PUT",
        },
        delete: {
            url: `${usersPrefix}/delete`,
            method: "DELETE",
        },
    },
    metrics: {
        activeUsers: {
            url: `${metricsPrefix}/users/active`,
            method: "GET",
        },
        loginsCount: {
            url: `${metricsPrefix}/logins`,
            method: "GET",
        },
        registersCount: {
            url: `${metricsPrefix}/registers`,
            method: "GET",
        },
        rolesActivity: {
            url: `${metricsPrefix}/roles/activity`,
            method: "GET",
        },
    },
    logs: {
        all: {
            url: `${logsPrefix}/all`,
            method: "GET",
        },
        track: {
            url: `${logsPrefix}/track-route`,
            method: "POST",
        },
    },
    devices: {
        list: {
            url: "devices",
            method: "GET",
        },
        delete: {
            url: "devices/delete",
            method: "DELETE",
        },
    },
    documents: {
        all: {
            url: "documents",
            method: "GET",
        },
        create: {
            url: "documents/create",
            method: "POST",
        },
        update: {
            url: "documents/update",
            method: "PUT",
        },
        delete: {
            url: "documents/delete",
            method: "DELETE",
        },
    },
};
export default apiEndPoints;
