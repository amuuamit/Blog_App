import { Send } from '@mui/icons-material'
import React, { useState } from 'react'

const CommentComp = () => {


    const [comment, setComment] = React.useState('');
    const [ comments , setComments] = React.useState([]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if(comment.trim()) {
            setComments([ ...comments, comment]);
            setComment('');
        }
    }
  return (

        <div className="comment">
            {comments.length > 0 ?(
                comments.map((comment, index) => (
                    <div style={{ position: "scroll"}} key={index}>
                        <h3>{comment}</h3>
                    </div>
                ))
            ) : (
                <h3>No Comments</h3>
                )}
        <div className='comment-box'>
        <h2>Comments</h2>
            <form action="submit" onClick={handleCommentSubmit}>
                 <input type="text"
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 placeholder='Comments......' />
                 <button type='submit'>Send <Send/></button>
                </form>
        </div>
        </div>
  )
}

export default CommentComp