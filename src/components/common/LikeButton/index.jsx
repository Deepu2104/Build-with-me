/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import { likePost, getLikesByUser, postComment, getComments } from '../../../api/FirestoreAPI';
import {getCurrentTimeStamp} from "../../../helpers/useMoment"
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';


// eslint-disable-next-line react/prop-types
export default function LikeButton({userId, postId, currentUser}) {
   const [likesCount, setLikesCount] = useState(0);
   const [liked, setLiked] = useState(false);
   const [showCommentBox, setShowCommentBox] = useState(false); 
   const [comment, setComment] = useState("")
   const [comments, setComments] = useState([])


  const handleLike = () => {
    likePost(userId, postId, liked);
  }
  const getComment = (event) => {
    console.log(event.target);
    setComment(event.target.value)
  }
  const addComment = () => {
    // eslint-disable-next-line react/prop-types
    postComment(postId, comment, getCurrentTimeStamp('LLL'), currentUser?.name)
    setComment("");
  }
  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments)
  }, [userId, postId])

  return (
    <div className='like-container' >
    <p>{likesCount} People like this post</p>
    <div className='hr-line'>
      <hr/>
    </div>
    <div className='like-comment'>
      <div className='likes-comment-inner' onClick={handleLike}>
        {liked ? <AiFillHeart size={20} color = "red" />  : <AiOutlineHeart size={20} />}
        <p className={liked ? "blue" : "black"} >Like</p>
      </div>

      <div className='likes-comment-inner' onClick={() => setShowCommentBox(!showCommentBox)}>
        <AiOutlineComment size={20} color = {showCommentBox ? "#0a66c2" : "black"} />
        <p className={showCommentBox ? "blue" : "black"} >Comment</p>
      </div>
    </div>
    {showCommentBox ?  <>
      <input onChange={getComment} placeholder='Add a comment' className='comment-input'
      name="comment"  value={comment} />
      <button className='add-comment-btn' onClick={addComment} >Add Comment</button>
      {comments.length > 0 ? comments.map((comment) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className='all-comments'>
            <p className='name'>{comment.name}</p>
            <p className='comment'>{comment.comment}</p>
            <p className='timestamp'>{comment.timeStamp}</p>
            {/* <p>•</p> */}
          </div>
        )
      }) : <></> }
    </> : <> </>}
    
    
    </div>
  )
}
