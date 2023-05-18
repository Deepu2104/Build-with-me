/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo, useEffect } from 'react'
import { getSingleStatus, getSingleUser} from '../../../api/FirestoreAPI';
import { useLocation } from 'react-router-dom';
import PostsCard from '../PostsCard';
import { TbEdit } from 'react-icons/tb';
import { uploadImage as uploadImageAPI } from '../../../api/ImageUpload';
import FileUploadModal from '../FileUploadModal';
import "./index.scss";

export default function ProfileCard({currentUser, onEdit}) {

  let location = useLocation(); 
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // console.log(currentUser?.imageLink);

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  }
  const uploadImage = () => {
    uploadImageAPI(currentImage, currentUser.userID, setModalOpen, setProgress, setCurrentImage);
  }
  
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <FileUploadModal getImage={getImage} uploadImage={uploadImage} modalOpen={modalOpen} setModalOpen={setModalOpen} currentImage={currentImage} progress={progress}  />
      <div className='profile-card'>
        
        <div className='edit-btn'>
          <TbEdit className='edit-icon' onClick={onEdit}  />
        </div>

        <div className='profile-info'>
          <div>
            {/* <img className='profile-image' onClick={() => setModalOpen(true)}
            src={currentUser?.imageLink} alt="profile-image" /> */}
            <h3 className='userName'>
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className='heading' >
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className='location'>
              {Object.values(currentProfile).length === 0
                ? currentUser.location
                : currentProfile?.location}
            </p>
            <p className='location'>
              {Object.values(currentProfile).length === 0
                ? currentUser.email
                : currentProfile?.email}
            </p>
            <a className='website' 
            // target="_blank",
            href = {Object.values(currentProfile).length === 0
                ? currentUser.website
                : currentProfile?.website} >
              {Object.values(currentProfile).length === 0
                ? currentUser.website
                : currentProfile?.website}
            </a>
            
          </div>
            
          <div className='right-info'>
            <p className='heading' >
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
            <p className='nickname' >
              {Object.values(currentProfile).length === 0
                ? currentUser.nickname
                : currentProfile?.nickname}
            </p>
          </div>
        </div>

        <p className='about-me'>
              {Object.values(currentProfile).length === 0
                ? currentUser.aboutMe
                : currentProfile?.aboutMe}
        </p>

        <p className='skills'>
        <span className='skill-text'> Skills: </span>
              {Object.values(currentProfile).length === 0
                ? currentUser.skills
                : currentProfile?.skills}
        </p>
      
      </div>

      <div className='post-status-main'>
        {allStatuses.filter((item) => {
          return item.userEmail === localStorage.getItem("userEmail");
        }).map((posts) => {
          // eslint-disable-next-line react/jsx-key
          return (
            <div key={posts.id}>
              <PostsCard posts = {posts} />
            </div>
            )
        })}
      </div>
    </>
    
  )
}
