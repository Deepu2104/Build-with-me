// eslint-disable-next-line no-unused-vars
import React, {useMemo, useState} from 'react'
import { getCurrentUser } from '../api/FirestoreAPI';
import Topbar from "../components/common/Topbar"
import Profile from '../Pages/Profile';

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return  (
    <div>
      <Topbar />
      <Profile currentUser={currentUser} />
    </div>
  )
}
