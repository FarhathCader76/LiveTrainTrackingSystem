import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './LoginSignup.css'

import user_icon from './Assests/person.png'
import email_icon from './Assests/email.png'
import password_icon from './Assests/password.png'
import train_icon from './Assests/train1.png'

import axios from "axios";

function LoginSignUp (){

const[action,setAction] = useState("Sign Up");

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [usernameOrEmail, setUsernameOrEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setSignupErrorMessage] = useState('');
const [errorMessage2, setLoginErrorMessage] = useState('');
const navigate = useNavigate();



const save = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setSignupErrorMessage("Please fill in all the fields.");
      return; // Don't proceed with registration
  }
    try {
        await axios.post("http://localhost:8080/register", {
            username: username,
            email: email,
            password: password,
        });
        setSignupErrorMessage("Account created Succesfully");
        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Username already exists error
            setSignupErrorMessage("User Name or Email Already Exists");
        } else {
            alert("An error occurred: " + error.message);
        }
    }
};

const login = async (event) => {
    event.preventDefault();
  
    try {
    
      await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
        }).then((res) => 
        {
         console.log(res.data);
         
         if (res.data.message == "User Name or Email not exits") 
         {
            setLoginErrorMessage("Email or Username not exits");
         } 
         else if(res.data.message == "Login Success")
         { 
            setLoginErrorMessage("");
            alert("Login Succesfull");
            navigate('/');
           
           
         } 
          else 
         { 
            setLoginErrorMessage("Incorrect Password");
         }
      }, fail => {
       console.error(fail); 
      });
    }// Error!


     catch (err) {
      alert(err);
    }
  
  }

  return (

    <div> 


      
        <div>

        <div >
        <img class="d-block mx-auto mb-4" src={train_icon} alt="" width="90" height="90"/>
        <h2 className="display-5 fw-bold" style={{textAlign : "center", margin: "10px"}}>SL TRAIN TRACE</h2>
        <p style={{textAlign : "center"}}>Experience seamless train tracking and real-time updates with SL Train Trace. 
                monitor arrivals and depatures, and stay informed about delays and schedule
                changes</p>
      </div>
    <div className='submit-container' style={{justifyContent: "center"}}>
        <div className={action === "Login"?"submit gray" : "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action === "Sign Up"?"submit gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
    </div>
    <div className='inputs' style={{justifyContent: "center"}}>
        {action === "Login" ? <div></div> : <div className='input'>
        <img src= {user_icon} alt = ""/>
        <input type='text'  placeholder='User Name' id='username'
         value={username}
         onChange={(event) => {
           setUsername(event.target.value);
           setUsernameOrEmail(event.target.value);
         }}/>
    </div>}
   
    <div className='input'>
        <img src= {email_icon} alt = ""/>
        <input type='email' placeholder='Email Address' id='email' 
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}/>
    </div>
    <div className='input'>
        <img src= {password_icon} alt = ""/>
        <input type='password' placeholder='Password'  id='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}/>
    </div>


    <div> {action === "Sign Up" ?  <div>{errorMessage}</div>: 
      <div>{errorMessage2}</div>}
      </div>  
        
   
   
    <div  style={{marginLeft: "650px"}} >
    {action === "Sign Up" ?  <button    class="btn btn-success btn-lg" type="submit" onClick={save}>Create An Account</button>: 
      <button class="btn btn-success btn-lg"   type="submit" onClick={login} >Login</button>}
        
       
    </div>
  
    </div>
    

  
  
</div>

</div>
   
  )
}

export default LoginSignUp;

