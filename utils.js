import jwt from "jsonwebtoken";
export function getToken(user) {
    return jwt.sign({
        email: user.body.email
    }, 'ritik')
}