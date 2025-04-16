import { Send } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import server from "../environment";
import { AuthContext } from "../context/AuthContext";

const CommentComp = ({ articleId }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  // Fetch comments for the article
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/comments/${articleId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to fetch comments. Please try again.");
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    if (!user) {
      alert("You must be logged in to post a comment.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.post(
        `${server}/api/v1/comments/createComments`,
        {
          articleId,
          userId: user._id,
          text: comment, // Ensure the field name matches the schema
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data]); // Add new comment to the list
      setComment(""); // Clear the input field
    } catch (error) {
      console.error(
        "Error posting comment:",
        error.response?.data || error.message
      );
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <h3>{comment.text}</h3>
          </div>
        ))
      ) : (
        <h3>No Comments</h3>
      )}
      <div className="comment-box" style={{ color: "white" }}>
        <div className="comment-form">
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comments..."
            />
            <button type="submit">
              Send <Send />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentComp;
