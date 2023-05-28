/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button, Modal, Progress } from 'antd';
import "./index.scss";

export default function FileUploadModal({modalOpen, setModalOpen, getImage,uploadImage, currentImage, progress }) {
  //console.log(progress);
  return (
    <div>
      <Modal
        title="Upload Profile Picture"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          
          <Button disabled={currentImage.name ? false : true} key="submit" type="primary" onClick={uploadImage}>
            Upload Picture
          </Button>,
          
        ]}
      >
      <div className='image-upload-main'>
        <p className='image-name'>{currentImage.name}</p>
        <label className='upload-btn' for="image-upload" >Add and Image</label>
        {progress == 0 ? <> </> :
         <div className='progress-bar'>
          <Progress type="circle" percent={progress} size={70} />
        </div>}
        <input hidden id="image-upload" type = {'file'} onChange={getImage} />
      </div>
        
      </Modal>
    </div>
  )
}
