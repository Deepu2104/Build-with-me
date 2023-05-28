// eslint-disable-next-line no-unused-vars
import React, {useMemo, useState} from 'react'
import Connections from '../Pages/Connections';
import { getCurrentUser } from '../api/FirestoreAPI';
import Topbar from "../components/common/Topbar"

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return  (
    <div>
      < Topbar />
      <Connections currentUser={currentUser} />
    </div>
  )
}
