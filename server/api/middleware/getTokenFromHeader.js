export default function getTokenFromHeader(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        return authHeader.split(" ")[1];
    }
    return null;
}
