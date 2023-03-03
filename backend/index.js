// EXTERNAL MODULES
const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

// ENVIRONMENT VARIABLES
require("dotenv").config();
const PORT = process.env.PORT;

// CONNECTION
const { connection } = require("./config/db");

// ROUTERS
const { userRouter } = require("./routes/user-auth.route");

// EXPRESS APPLICATION
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie_parser());
app.get("/", (req, res) => {
    res.json({ "msg": "Wecome to your blog" });
})

app.use("/auth", userRouter);



app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to Database");
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        console.log("Error connecting to Database");
        console.log(error);
    }
})