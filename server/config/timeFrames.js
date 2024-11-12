const now = new Date();

export default {
    "1h": new Date(now.getTime() - 1 * 60 * 60 * 1000),
    "1d": new Date(now.getTime() - 24 * 60 * 60 * 1000),
    "3d": new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    "1w": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    "1m": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
};
