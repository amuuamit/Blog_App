var express = require("express");
const {
  createArticle,
  getPosts,
  updateArticle,
  deleteArticle,
} = require("../Controllers/article.controller");
const { isLoggedIn } = require("../Middlewares/login.mw");
const upload = require("../Configurations/multer.config");
var articleRouter = express.Router();

articleRouter.post(
  "/createArticle",
  isLoggedIn,
  upload.single("file"),
  createArticle
); // Specify the field name for the file upload
articleRouter.get("/getPosts", getPosts);
articleRouter.put(
  "/updateArticle/:id",
  isLoggedIn,
  upload.single("file"),
  updateArticle
); // Specify the field name for the file upload
articleRouter.delete("/deleteArticle/:id", isLoggedIn, deleteArticle);

module.exports = articleRouter;
