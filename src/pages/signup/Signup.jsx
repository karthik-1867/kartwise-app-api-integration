import React from 'react'
import { Link } from 'react-router-dom'
import "../login/login.css"

export default function Signup() {
  return (
    <div>
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
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter name' className='loginFormInput' autoComplete='off' />
                </div>
                <div className="inputHolder">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter email' className='loginFormInput' autoComplete='off' />
                </div>
                <div className="inputHolder">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='password' className='loginFormInput' autoComplete='new-password'/>
                </div>
                <Link to="/" style={{textDecoration:'none',color:'inherit'}}>

                   <button className='submitSignin'>Submit</button>
               </Link>
             </div>

           </div>
      </div>
    </div>
    </div>
  )
}
