import { signInWithEmailAndPassword, 
  createUserWithEmailAndPassword ,
  GoogleAuthProvider,
  signInWithPopup,
  signOut}  
  from 'firebase/auth';
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";

export const LoginAPI = (email, password) => {
  try{
    let response = signInWithEmailAndPassword(auth, email, password);
    return response ;
  }
  catch(err){
    return err;
  }
};

export const RegisterAPI = (email, password) => {
  try{
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response ;
  }
  catch(err){
    return err;
  }
};

export const GoogleSignInAPI = () => {
  try{
    let googleProvider = new GoogleAuthProvider;
    let res = signInWithPopup(auth, googleProvider);
    return res;

  }
  catch(err){
    return err;
  }
};


// eslint-disable-next-line react-refresh/only-export-components
export const onLogout = () => {
  try{
    signOut(auth);
    toast.success("Logged out Successfully!");
    
  }catch(err){
    return err;
  }
}


