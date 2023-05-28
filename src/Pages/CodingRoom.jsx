/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import CodingRoomComponent from '../components/CodingRoomComponent';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

export default function CodingRoom() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      onAuthStateChanged(auth, (res) => {
        if (res?.accessToken) {
          setLoading(false);
        } else {
          navigate("/coding-room"); // Redirect to login or any other desired path
        }
      });
    };

    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  
  return loading ? <Loader /> : <CodingRoomComponent />;
}
