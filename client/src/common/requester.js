import getDeviceInfo from "../helpers/getDeviceInfo";

export default async function requester(url, options, useToken = false) {
    const host = import.meta.env.VITE_API_HOST;
    const fetchUrl = `${host}/${url}`;

    const deviceInfo = getDeviceInfo();
    if (options.body) {
        options.body = { ...options.body, ...deviceInfo };
    }

    const headers = {
        "Content-Type": "application/json",
    };

    if (options.headers) {
        options.headers = { ...options.headers, ...headers };
    } else {
        options.headers = headers;
    }

    if (options.body) {
        options.body = JSON.stringify(options.body);
    }
    if (useToken) {
        const token = localStorage.getItem("token");
        options.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fetchUrl, {
        ...options,
    });
    const responseJson = await response.json();

    return { responseJson, response };
}
