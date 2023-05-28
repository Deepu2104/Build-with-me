/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getAllUsers, deletePost, getConnections } from "../../../api/FirestoreAPI";
import LikeButton from '../LikeButton';
import { BsPencil, BsTrash } from "react-icons/bs"
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false); 

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, [])

  console.log(currentUser);
  useEffect(() => {
    getConnections(currentUser.userID, posts.userid, setIsConnected);
  }, [currentUser.userID, posts.userid])

  // console.log(isConnected);

  // console.log(posts);

  return (
    isConnected || currentUser.userID === posts.userid ? 
    (<div className='posts-card' key={id}>
    <div className='post-image-wrapper'>

      {currentUser.userID === posts.userid ? <div className="action-container">
        <BsPencil size={20} className="action-icon" 
        onClick={() => getEditData(posts) } />
        <BsTrash size={20} className="action-icon" onClick={() => deletePost(posts.id)} />
      </div> : <> </> }

      <img src = {allUsers.filter((item) => item.userID === posts.userid).map((item) => item.imageLink)[0]} alt="profile-icon-image" className='post-image' />
      <div>
        <p className='name' 
        onClick={() => navigate("/profile", {
          state : {id : posts?.userid, email : posts?.userEmail}
        })} >
        {allUsers.filter((user) => user.id == posts.userid)[0]?.name}
        </p>
        <p className='timestamp'> {posts.timeStamp}</p>
      </div>
      
    </div>
    
      {posts.postImage ? <img src ={posts.postImage} alt ="post-image"/> : <> </>}
      <p className='status'>{posts.status}</p>
      <LikeButton userId = {currentUser?.userID} postId = {posts.id} currentUser={currentUser} />
    </div>) : (<> </>)
  )
}
