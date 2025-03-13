var express = require("express");
// const { User } = require("../Models/user.model");

// const multer = require("multer");
// const upload = multer({ dest: "uploads/"});
const upload = require("../Middlewares/multer.mw")

// const multer = require("multer");
// const upload = multer({ dest: "/uploads"})

// var jwt = require("jsonwebtoken");
const { createUser, login, getUser, getuserById, getPostByUserId, subscribeUser, deleteUsers, uploadImg } = require("../Controllers/user.controller");
const { isLoggedIn } = require("../Middlewares/login.mw");
const { deletePostByPostId } = require("../Controllers/article.controller");
// const { authorizeRole } = require("../Middlewares/role.mw");
var userRouter = express.Router();

// creating the user
userRouter.post("/createUser",createUser);

// userRouter.post("/upload",isLoggedIn,upload, uploadImg);

// login the user
userRouter.post("/login", login);

// get All users
userRouter.get("/getUser",isLoggedIn,getUser);

//get user by id only
userRouter.get("/getUser/:id",isLoggedIn,getuserById);

// get post by id it has the middleware function to check the user is logged in or not
userRouter.get("/getPostByUserId/:id",isLoggedIn, getPostByUserId)

// delete the post by post id middlwre is also used to check the user is logged in or not if not then you can't delete the post
// userRouter.delete("/deletePostByPostId/:id", isLoggedIn, authorizeRole, deletePostByPostId)

// userRouter.delete("/delete", isLoggedIn, authorizeRole("ADMIN"), deleteUsers)


// subscribe the user if it is logged in or not
userRouter.patch("/subscribeUser", subscribeUser)

// 
//  userRouter.get("/getPostByUserId/:id",isLoggedIn,getPostByUserId);

module.exports = { userRouter };