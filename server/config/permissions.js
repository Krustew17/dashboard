const rolesPermissions = {
    admin: [
        "manage_users",
        "view_logs",
        "audit",
        "access_all_settings",
        "edit_roles",
    ],
    updater: [
        "upload_documents",
        "edit_documents",
        "view_personal_metrics",
        "track_activity",
    ],
    viewer: ["view_analytics", "generate_reports", "download_reports"],
    sed1: ["view_compliance_metrics", "view_flagged_issues"],
};

export default rolesPermissions;
