import routePrefixes from "../constants/routePrefixes";

const apiEndPoints = {
    auth: {
        refreshToken: {
            url: `${routePrefixes.auth}/refresh-token`,
            method: "POST",
        },
    },
    users: {
        all: {
            url: routePrefixes.users,
            method: "GET",
        },
        update: {
            url: `${routePrefixes.users}/edit`,
            method: "PUT",
        },
        delete: {
            url: `${routePrefixes.users}/delete`,
            method: "DELETE",
        },
    },
    metrics: {
        activeUsers: {
            url: `${routePrefixes.metrics}/users/active`,
            method: "GET",
        },
        loginsCount: {
            url: `${routePrefixes.metrics}/logins`,
            method: "GET",
        },
        registersCount: {
            url: `${routePrefixes.metrics}/registers`,
            method: "GET",
        },
        rolesActivity: {
            url: `${routePrefixes.metrics}/roles/activity`,
            method: "GET",
        },
        mostViewedPage: {
            url: `${routePrefixes.metrics}/page/most-viewed`,
            method: "GET",
        },
        pageViewsCount: {
            url: `${routePrefixes.metrics}/page/views`,
            method: "GET",
        },
    },
    logs: {
        all: {
            url: `${routePrefixes.logs}/all`,
            method: "GET",
        },
        track: {
            url: `${routePrefixes.logs}/track-route`,
            method: "POST",
        },
    },
    devices: {
        list: {
            url: routePrefixes.devices,
            method: "GET",
        },
        delete: {
            url: `${routePrefixes.devices}/delete`,
            method: "DELETE",
        },
    },
    documents: {
        all: {
            url: routePrefixes.documents,
            method: "GET",
        },
        create: {
            url: `${routePrefixes.documents}/create`,
            method: "POST",
        },
        update: {
            url: `${routePrefixes.documents}/update`,
            method: "PUT",
        },
        delete: {
            url: `${routePrefixes.documents}/delete`,
            method: "DELETE",
        },
    },
};
export default apiEndPoints;
