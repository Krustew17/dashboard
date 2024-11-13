const usersPrefix = "users";

const metricsPrefix = "metrics";

const apiEndPoints = {
    users: {
        all: {
            url: usersPrefix,
            method: "GET",
        },
        editUser: {
            url: `${usersPrefix}/edit`,
            method: "PUT",
        },
        deleteUser: {
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
    },
};
export default apiEndPoints;
