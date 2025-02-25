import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import '../user/user.css'

export default function User({user,userData,addUser,addFavUser,profile,deleteUser}) {

  const [hover, setHover] = useState(false);

  const addUserData = () =>{
    addUser(userData)
  }

  const removeUserData = () =>{
    deleteUser(addFavUser?.id)
  }

  const userDataD = profile == 'true' ? userData : addFavUser

  console.log("inside user jsx")
  console.log(userData)
  return (
    <div className='UserContainer' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className="UserDetailsWrapper">
      {
      userDataD?.profilePicture ? <img src={userDataD?.profilePicture} alt="" className='UserContainerLogProfile'/> :
        <Avatar className='UserContainerLogo'/>
      }
      <div className="UserDetails">
         <span className='UserDetailsUserName'>{userDataD?.username}</span>
         <span className='UserDetailsName'>{userDataD?.username}</span>
      </div>
      </div>
      
      {hover && (profile == 'false'? <button onClick={removeUserData} className='UserAddToFavButton'>Delete</button> :<button onClick={addUserData} className='UserAddToFavButton'>Invite</button>)}
    </div>
  )
}
