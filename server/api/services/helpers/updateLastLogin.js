export default async function updateLastLoginDate(user) {
    return await user.update({ lastLogin: new Date() });
}
