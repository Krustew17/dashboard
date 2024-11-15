import validPageRoutes from "../../../config/validPageRoutes.js";

const validPagePath = (path) => {
    if (!validPageRoutes[path]) {
        return false;
    }
    return validPageRoutes[path];
};
export default { validPagePath };
