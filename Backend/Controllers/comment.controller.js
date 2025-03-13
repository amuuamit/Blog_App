const { Article } = require("../Models/article.model");
const { Comment } = require("../Models/comment.model");


async function createComment(req, res) {

    try {
        const comment = await Comment.create(req.body);
        if (comment) {
            let post = await Article.findOne({ _id: comment.article })
            post.comments.push(comment._id);
            await post.save(); 
        res.status(201).json({
            message: "Comment crea ted successfully"
        })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error in comment",
            error:error,
        })
    }
    
}

module.exports = { createComment };