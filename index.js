const express = require('express');
const connectDB = require('./src/config/db')

const jwt = require("jsonwebtoken")
// const validateSignUpData = require('./src/utils/validation')
const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const requestRouter = require("./src/routes/request")

const cookieParser = require("cookie-parser");
const User = require('./src/models/user');


const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

// app.get("/profile", async (req, res) => {

//     const cookies = req.cookies;
//     try {

//         const { token } = cookies;
//         if (!token) {
//             throw new Error("invalid token")
//         }
//         const decodeMessage = await jwt.verify(token, "charlie@dev2");
//         const { _id } = decodeMessage;
//         console.log("id", _id);
//         const user = await User.findById(_id);

//         if (!user) {
//             throw new Error("user does not exist")
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(401).send({ error: error.message })
//     }
// })

connectDB().then(() => {
    console.log('DB connected')

    app.listen(4001, (req, res) => {
        console.log(`Running on port 4001`)
    })

}).catch((err) => {
    console.log(err)
});
