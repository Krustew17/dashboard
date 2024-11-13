export default async function requester(url, options) {
    const host = import.meta.env.VITE_API_HOST;
    const fetchUrl = `${host}/${url}`;

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

    const response = await fetch(fetchUrl, {
        ...options,
    });
    const responseJson = await response.json();
    console.log(responseJson);

    return { responseJson, response };
}
