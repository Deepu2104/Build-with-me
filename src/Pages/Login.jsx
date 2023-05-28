/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import LoginComponent from '../components/LoginComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

export default function Login() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if(res?.accessToken){
        navigate("/home")
      } else{
        setLoading(false);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return loading ? < Loader /> : < LoginComponent />;
}
