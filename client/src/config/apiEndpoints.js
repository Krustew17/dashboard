const apiEndPoints = {
    auth: {
        login: {
            url: "/auth/login",
            method: "POST",
        },
        register: {
            url: "/auth/register",
            method: "POST",
        },
    },
    users: {
        all: {
            url: "users",
            method: "GET",
        },
        editUser: {
            url: "users/edit",
            method: "PUT",
        },
        deleteUser: {
            url: "users/delete",
            method: "DELETE",
        },
    },
};
export default apiEndPoints;
