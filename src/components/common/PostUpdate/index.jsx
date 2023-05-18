/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useState, useMemo } from 'react'
import ModalComponent from '../Modal';
import { postStatus, getStatus, updatePost } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard';
import { uploadPostImage } from '../../../api/ImageUpload';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import "./index.scss";
import { getUniqueID } from '../../../helpers/getUniqueId';

export default function PostStatus({currentUser}) {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatuses, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");
  
  console.log(postImage);

  const sendStatus = async () => {
    let object = {
      status : status,
      timeStamp : getCurrentTimeStamp('LLL'),
      userEmail : currentUser.email,
      userName : currentUser.name,
      postID : getUniqueID(),
      userid : currentUser.userID,
      postImage : postImage,
    }
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  }
  

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  }
  const updateStatus = () => {
    console.log(status);
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  }

  useMemo(() => {
    getStatus(setAllStatus);
  }, [])
  // console.log(currentUser);

  

  return (
    <div>
      <div className='post-status-main'>
        <div className='user-details'>
          <img src={currentUser.imageLink} alt="user-pic" />
          <p className='name'>{currentUser.name}</p>
          <p className='headline'>{currentUser.headline}</p>

        </div>
        <div className='post-status'>
          <button className='open-post-modal' onClick={() => {
            setModalOpen(true)
            setIsEdit(false);
          }}>
            Tell about Yourself!
            
          </button>
        </div>

        <ModalComponent  
        modalOpen = {modalOpen} 
        setModalOpen = {setModalOpen} 
        setStatus = {setStatus}
        status = {status}
        sendStatus = {sendStatus}
        isEdit= {isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        setPostImage={setPostImage}
        postImage={postImage}
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
        />

      <div>
        {allStatuses.map((posts) => {
          // eslint-disable-next-line react/jsx-key
          return (
            <div key={posts.id}>
              <PostsCard posts = {posts} getEditData={getEditData} />
            </div>
            )
        })}
      </div>
      
      </div>
    </div>
  )
}
