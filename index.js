const express = require('express');
const User = require('./src/models/user')
const connectDB = require('./src/config/db')

const app = express();
app.use(express.json())

connectDB().then(() => {
    console.log('DB connected')

    app.listen(4001, (req, res) => {
        console.log(`Running on port 4001`)
    })

}).catch((err) => {
    console.log(err)
});


app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.send('userAdded successfully')

    } catch (error) {
        res.send('something went wrong' + error.message)

    }
})

