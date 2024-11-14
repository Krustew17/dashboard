export default function documentStatusPropClasses(status) {
    return `font-semibold ${
        status === "active"
            ? "text-green-500"
            : status === "inactive"
            ? "text-red-500"
            : status === "pending"
            ? "text-yellow-500"
            : ""
    }`;
}
