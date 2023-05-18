/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { Modal, Button, Progress } from 'antd';
import { AiOutlinePicture } from "react-icons/ai"; 
import "./index.scss";

// eslint-disable-next-line react/prop-types
const ModalComponent = ({modalOpen, setModalOpen, 
  setStatus, status, sendStatus, isEdit, updateStatus, uploadPostImage, 
  setPostImage, postImage, currentPost, setCurrentPost }) => {

    const [progress, setProgress] = useState(0);

  return (
    <>
      
      
      <Modal
        title="Write about yourself here"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage(""); 
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          
          <Button key="submit" type="primary" 
          onClick={isEdit ? updateStatus : sendStatus}
          // eslint-disable-next-line react/prop-types
          disabled = {(status.length > 0) ? false : true}>
            {isEdit ? "Update" : "Post"}
          </Button>,
          
        ]}
      >
      <div className='posts-body'>
          <textarea 
          rows ={5}
          cols = {5}
          className='modal-input' 
          placeholder='Write what you know and whom you want' 
            onChange={ (event) => setStatus(event.target.value)}
            value={status}
          /> 
          {progress === 0 || progress == 100 ? <> </> : <div className='progress-bar'>
            <Progress type="circle" percent={progress} size={70} />
          </div>}
          {postImage?.length > 0 || currentPost?.postImage?.length ? 
          <img className='preview-image' src = {postImage || currentPost?.postImage} alt="post-image" /> : <></>}
      </div>
        


       <label for="pic-upload" >
        <AiOutlinePicture size={30} className="picture-icon" />
       </label>
       <input hidden id="pic-upload" type={"file"} 
       onChange={(event) => uploadPostImage(event.target.files[0], setPostImage, setProgress)} />
       
      </Modal>
    </>
  );
};

export default ModalComponent;