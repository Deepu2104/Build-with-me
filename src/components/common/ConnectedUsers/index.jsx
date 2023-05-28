/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import { getConnections } from '../../../api/FirestoreAPI';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./index.scss";

export default function ConnectedUsers({user, getCurrentUser, currentUser}) {
  const [isConnected, setIsConnected] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    getConnections(currentUser.userID, user.id, setIsConnected);
  }, [currentUser.userID, user.id])

  return (
    isConnected ?  <> </> : 
    <div className='grid-child' >
      <img src={user.imageLink} />
      <span className='button-profile' onClick={() => navigate("/profile", { state: { id: user.id, email: user.email } })}>{user.name}</span>
      <span className='headline' > {user.headline} </span>
      
      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Add as Friend
      </button>
    </div>
  )
}
