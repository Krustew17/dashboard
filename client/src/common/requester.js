export default async function requester(url, options) {
    return fetch(url, options).then((res) => res.json());
}
