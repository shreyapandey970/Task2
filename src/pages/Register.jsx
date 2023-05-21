import React,{useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth , storage, db} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err,setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  


  const handleSubmit = async(e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    




    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on(
      'state_changed',null,
          (error) => {
                        setErr(true);
                     }, 
      () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                 await updateProfile(res.user,{
                displayName,
                photoURL : downloadURL,
                 });
                await setDoc(doc(db,"users",res.user.uid),{
                id : res.user.uid,
                displayName,
                email,
                photoURL : downloadURL,
                });
                                                                                                                      
               await setDoc(doc(db,"userChats",res.user.uid),{});
               navigate("/");

               setSuccess(true);
               });
            }
        );


  

    }catch(err){
        setErr(true);
    }

  }

  return (
    <div id="greenbar">
      <img src={require('../img/logo.png')} height={60} width={250} id="convoimg"></img>
      <div id="loginalign"></div>
        <div id="registeritems">
            <div id="logincard">
              <tr></tr>
            <h3>Register</h3>
            <form onSubmit={handleSubmit} id="log">
                <input type="text" placeholder="Enter Display Name" id="input"/><p></p>
                <input type="email" placeholder="Enter Email" id="input"/><p></p>
                <input type="password" placeholder="Enter Password" id="input"/><p></p>
                <input style={{display:"none"}} type="file" id="file" /><p></p>
                
                <label htmlFor="file" ><img id="avatar" src="https://static.thenounproject.com/png/3752804-200.png" height={40} width={40}></img>Add an Avatar</label><p></p>
                <button id="signinbutton">Sign Up</button><p></p>
                {err && <span style={{color:"red"}}>Something went wrong</span>}
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        </div>
    </div>
  )
}

export default Register


//Enable Email/Password Authentication - (Only Email)