const jwt = require("jsonwebtoken");
const User = require("../models/user")


const userAuth = async (req, res, next) => {

    try {
        console.log("Cookies:", req.cookies);

        const { token } = req.cookies;

        if (!token) {
            throw new Error("token is not valid")
        };

        const decodeMessage = await jwt.verify(token, "charlie@dev2");

        const { _id } = decodeMessage;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("user not found")
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).send({ error: error.message });
    }

}
module.exports = userAuth