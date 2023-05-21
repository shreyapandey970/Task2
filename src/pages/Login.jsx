import React, {useState} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async(e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")  

    }catch(err){
        setErr(true);
    }

  }





  return (
    <div id="greenbar">

        <div>
            <img src={require('../img/logo.png')} height={60} width={250} id="convoimg"></img>
            <div id="loginalign"></div>
              <div id="registeritems">
                <div id="registercard">
                  <br></br>
                <h3>Login</h3>
                   <form onSubmit={handleSubmit} id="log">
                
                     <input type="email" placeholder="Enter Email" id="input" /><p></p>
                    <input type="password" placeholder="Enter Password" id="input"/><br></br><br></br>
            
                    <button id="signinbutton">Login</button><p></p>
                   {err && <span style={{color:"red"}}>Something went Wrong!!</span>}
                </form>
                <p>New to Convo? <Link to="/register">Register</Link></p>
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
