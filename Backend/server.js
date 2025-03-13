var express = require("express");
var app = express();
var dotenv = require("dotenv");
let cookieParser = require("cookie-parser");
var cors = require('cors');
const { dbConfig } = require("./Configurations/db.config");

const { userRouter } = require("./Routers/user.router");
const articleRouter = require("./Routers/article.router");
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

const { commentRouter } = require("./Routers/comment.router");
const { cloudinaryConfig } = require("./Configurations/cloudinary.config");
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/comment", commentRouter);
app.listen(PORT, () => {
    dbConfig();
    // cloudinaryConfig();
    console.log(`Listening to the port ${PORT}`);
});



