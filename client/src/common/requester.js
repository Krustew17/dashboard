import getDeviceInfo from "../helpers/getDeviceInfo";
import apiEndpoints from "../config/apiEndpoints";
import store from "../redux/store";
import { setSessionExpired } from "../redux/slices/sessionSlice";

const host = import.meta.env.VITE_API_HOST;

const buildHeaders = (useToken, customHeaders = {}) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    if (useToken) {
        const token = localStorage.getItem("token");
        if (token) defaultHeaders.Authorization = `Bearer ${token}`;
    }
    return { ...defaultHeaders, ...customHeaders };
};

const buildBody = (body) => {
    if (!body) return null;

    const deviceInfo = getDeviceInfo();
    return JSON.stringify({ ...body, ...deviceInfo });
};

export default async function requester(url, options, useToken = false) {
    try {
        const fetchUrl = `${host}/${url}`;

        const headers = buildHeaders(useToken, options.headers);
        const body = buildBody(options.body);

        const response = await fetch(fetchUrl, {
            ...options,
            headers,
            body,
        });

        if (response.status === 401 && useToken) {
            const newToken = await refreshToken();
            if (newToken.message === "Token refreshed successfully") {
                const retryHeaders = buildHeaders(true, options.headers);
                const retryResponse = await fetch(fetchUrl, {
                    ...options,
                    headers: retryHeaders,
                    body,
                });
                const retryResponseJson = await retryResponse.json();
                return {
                    responseJson: retryResponseJson,
                    response: retryResponse,
                };
            }
            console.log(newToken);

            store.dispatch(setSessionExpired());
        }
        const responseJson = await response.json();

        return { responseJson, response };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await fetch(
            `${host}/${apiEndpoints.auth.refreshToken.url}`,
            {
                method: apiEndpoints.auth.refreshToken.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.newToken);
            return {
                message: "Token refreshed successfully",
            };
        }

        console.error("Failed to refresh token");
        return {
            message: "Failed to refresh token",
        };
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};
