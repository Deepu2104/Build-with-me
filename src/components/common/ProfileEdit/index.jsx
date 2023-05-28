/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI';
import { TbArrowsCross } from 'react-icons/tb';
import "./index.scss"

// eslint-disable-next-line react/prop-types
export default function ProfileEdit({onEdit, currentUser}) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let {name, value} = event.target;
    let input = {[name]: value};
    setEditInputs({...editInputs, ...input});
  }
  const  updateProfileData = async () =>{
    await editProfile(currentUser.userID, editInputs);
    await onEdit();
  }
  console.log(currentUser);
  
  return (
    <div className='profile-card'>
     
      <div className='edit-btn'>
        <TbArrowsCross className='close-icon' onClick={onEdit} size={20} />
      </div>
      <div className='profile-edit-inputs'>
        <label>Name</label>
        <input onChange={getInput} className='common-input' placeholder='name' 
        name = 'name' value={editInputs.name} />
        <label>Location</label>
        <input onChange={getInput} className='common-input' placeholder='Location'
        name = 'location' value={editInputs.location} />
        <label>Headline</label>
        <input onChange={getInput} className='common-input' placeholder='Headline' 
          name = 'headline' value={editInputs.headline}
        />
        <label>Company</label>
        <input onChange={getInput} className='common-input' placeholder='Company'
        name = 'company' value={editInputs.company} />
        <label>Nickname</label>
        <input onChange={getInput} className='common-input' placeholder='nickname'
        name = 'nickname' value={editInputs.nickname} />

        <label>Website</label>
        <input onChange={getInput} className='common-input' placeholder='Website'
        name = 'website' value={editInputs.website} />

        <label >About</label>
        <textarea onChange={getInput} name = "aboutMe" 
        value = {editInputs.aboutMe} placeholder='About Me' 
        className='common-textArea' rows={5} />

        <label className='skill-label'>Skills</label>
        <input onChange={getInput} className='common-input' placeholder='Skills'
        name = 'skills' value={editInputs.skills} />
      </div>
      <div className='save-btn-container'>
        <button className='save-btn' onClick={updateProfileData} >Save</button>
      </div>
    </div>
    
  )
}
