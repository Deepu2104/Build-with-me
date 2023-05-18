/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import { getConnections } from '../../../api/FirestoreAPI';
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function ConnectedUsers({user, getCurrentUser, currentUser}) {
  const [isConnected, setIsConnected] = useState(false); 

  useEffect(() => {
    getConnections(currentUser.userID, user.id, setIsConnected);
  }, [currentUser.userID, user.id])

  return (
    isConnected ?  <> </> : 
    <div className='grid-child'>
      <img src={user.imageLink} />
      <span className='name' > {user.name} </span>
      <span className='headline' > {user.headline} </span>
      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Add as Friend
      </button>
    </div>
  )
}
