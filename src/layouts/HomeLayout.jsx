// eslint-disable-next-line no-unused-vars
import React, {useMemo, useState} from 'react'
import Home from '../Pages/Home'
import { getCurrentUser } from '../api/FirestoreAPI';
import Topbar from "../components/common/Topbar"

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return  (
    <div>
      < Topbar />
      < Home currentUser={currentUser} />
    </div>
  )
}
