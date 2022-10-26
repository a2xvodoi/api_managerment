import jwt from "jsonwebtoken";

export default function (req, res, next) {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send("Access Denied");

    try {
        res.locals.token = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
}
