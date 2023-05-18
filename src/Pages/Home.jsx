// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebaseConfig"
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

// eslint-disable-next-line react/prop-types
export default function Home({currentUser}) {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if(!res?.accessToken){
        navigate("/login");
      }else{
        setLoading(false)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? < Loader /> : < HomeComponent currentUser={currentUser} />;
}
