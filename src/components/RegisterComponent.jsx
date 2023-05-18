/* eslint-disable no-unused-vars */
import {React, useState} from 'react'
import {RegisterAPI, GoogleSignInAPI} from "../api/AuthAPI"
import buildWithMeLogo from "../assets/build-with-me-logo.jpg"
import GoogleButton from 'react-google-button'
import "../Sass/LoginComponent.scss"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { postUserData } from '../api/FirestoreAPI'
import { getUniqueID } from "../helpers/getUniqueId"

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});

  const register = async () => {
    try{
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created Successfully")
      postUserData({
        name : credentails.name, 
        email: credentails.email,
        userID : getUniqueID(),
        imageLink : "https://www.shutterstock.com/image-vector/black-linear-photo-camera-logo-600w-622639151.jpg",

      });
      navigate("/home");
      localStorage.setItem('userEmail',res.user.email);
    }
    catch(err){
      console.log(err);
      toast.error("Cannot create your account. Please Try Again!")
    }

  }

  const googleSignIn = async () => {
    try{
      let response = await GoogleSignInAPI();
      toast.success("Great , sign in successful!");
      navigate("/home")
      console.log(response);
    }catch(err){
      toast.error("Either email or password is Wrong. Please Try Again!")
    }
  }

  return (
    <div className="login-wrapper">
        <img src = {buildWithMeLogo} className='buildWithMelogo' />
        <h1 className="heading">Find your project partners in few clicks!</h1> 

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={register} className="login-btn">
          Join the community~
        </button>
        <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton onClick={googleSignIn} />
        <p className="go-to-signup">
          Already registered!{" "}
          <span className="join-now" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
