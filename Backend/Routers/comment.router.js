var express = require("express");
const { createComment } = require("../Controllers/comment.controller");

const commentRouter = express.Router();

commentRouter.post("/createComments", createComment);

module.exports = { commentRouter };
