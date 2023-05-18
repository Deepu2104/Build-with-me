/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import { getAllUsers, addConnection } from "../api/FirestoreAPI"
import ConnectedUsers from './common/ConnectedUsers';
import "../Sass/ConnectionsComponent.scss"

export default function ConnectionsComponent({currentUser}) {
  const [users, setUsers] = useState([]);
  

  const getCurrentUser = (id) => {
    console.log(currentUser);
    addConnection(currentUser.userID, id);
  }
   
  useEffect(() => {
    getAllUsers(setUsers);
  },[])

  

  

  return (
    <div className='connections-main'>
      {users.map((user) => {
        
        return <ConnectedUsers user={user} getCurrentUser={getCurrentUser} currentUser={currentUser} />
      })}
    </div>
  )
}
