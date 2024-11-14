export default function documentStatusPropClasses(status) {
    return `font-semibold ${
        status === "approved"
            ? "text-green-500"
            : status === "rejected"
            ? "text-red-500"
            : status === "pending"
            ? "text-yellow-500"
            : status === "draft"
            ? "text-purple-300"
            : status === "archived"
            ? "text-gray-400"
            : ""
    }`;
}
