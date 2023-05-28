/* eslint-disable no-unused-vars */
import {React, useState} from 'react'
import {LoginAPI, GoogleSignInAPI} from "../api/AuthAPI"
import buildWithMeLogo from "../assets/build-with-me-logo.jpg"
import GoogleButton from 'react-google-button'
import "../Sass/LoginComponent.scss"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try{
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Great , sign in successful!")
      navigate("/home");
      localStorage.setItem('userEmail',res.user.email); 
      console.log(res);
    }
    catch(err){
      console.log(err);
      toast.error("Either email or password is Wrong. Please Try Again!")
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
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
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
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to Build-with-me?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join Now
          </span>
        </p>
      </div>
    </div>
  );
}
