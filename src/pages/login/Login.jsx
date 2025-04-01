import React, { useEffect, useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { Password } from '@mui/icons-material'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';

export default function Login() {

  const dispatch = useDispatch();
  const [inputs,setInputs] = useState({email:"",password:""});
  const [errorMessage,setErrorMessage] = useState("");
  const navigate = useNavigate();

  console.log(inputs)

  const handleInput = (e) =>{
     setInputs((prev)=>{
       return {...prev, [e.target.name]:e.target.value}
     })
  }

  const handleSignIn = async() => {
    const {email,password,others} = inputs;
    console.log(email,password);
    setErrorMessage("")
    if(!email){
      return setErrorMessage("please enter email");
    }

    if(!password){
      return setErrorMessage("please enter password")
    }

    try{
      dispatch(loginStart())
      const user = await axios.post(`${process.env.REACT_APP_URL}/user/signin`,{email,password},{withCredentials:true})
      console.log(user);
      dispatch(loginSuccess(user.data));
    }catch(e){
      console.log(JSON.stringify(e.response))
      dispatch(loginFailure());
      return setErrorMessage(e.response);
    }


    navigate('/home');  

  }

  

  return (
    <div className='loginContainer'>
      <div className="loginFormContainer">
           <div className="loginFormContainerLeft">
             <div className="kartwiseLogo">
                kartwise
             </div>
             <span>Want to track your expense. Absolutely you are at right place!</span>
           </div>
           <div className="loginFormContainerRight">
             <div className="loginFormWrapper">
                <div className="inputHolder">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='email' name='email' onChange={(e)=>handleInput(e)} className='loginFormInput' />
                </div>
                <div className="inputHolder">
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='password' name="password" onChange={(e)=>handleInput(e)} className='loginFormInput' />
                </div>
                
              <button className='submitSignin' onClick={handleSignIn}>
                <Link to="#" style={{textDecoration:'none',color:'inherit'}}>
                  Sign in
                </Link>
                </button>
              <span>or</span>
              <Link to="/signup" style={{textDecoration:'none',color:'inherit'}}>
              <button className='submit'>Sign up</button>
              </Link>
              {errorMessage && <div className="ErrorContainer">
                {errorMessage}
              </div>}
             </div>

           </div>
      </div>

    </div>
  )
}
