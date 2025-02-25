import React from 'react'
import "./login.css"
import { Link } from 'react-router-dom'

export default function Login() {
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
                    <input type="email" placeholder='email' className='loginFormInput' />
                </div>
                <div className="inputHolder">
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='password' className='loginFormInput' />
                </div>
                <Link to="/home" style={{textDecoration:'none',color:'inherit'}}>
              <button className='submitSignin'>Sign in</button>
              </Link>
              <span>or</span>
              <Link to="/signup" style={{textDecoration:'none',color:'inherit'}}>
              <button className='submit'>Sign up</button>
              </Link>
             </div>

           </div>
      </div>
    </div>
  )
}
