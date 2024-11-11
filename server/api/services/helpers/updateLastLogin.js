export default function updateLogin(user) {
    return user.update({ lastLogin: new Date() });
}
