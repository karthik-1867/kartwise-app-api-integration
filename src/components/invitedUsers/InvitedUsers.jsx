import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import '../invitedUsers/invitedusers.css'
import axios from 'axios';

export default function InvitedUsers({user,rejectInvitedUser}) {

  const [hover, setHover] = useState(false);
  const [invitedUserDetail,setInvitedUserDetail] = useState("");
  const removeUserData = () =>{
    rejectInvitedUser(user)
  }

  useState(()=>{
    const invitedUser = async()=>{
      const userData = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})
      setInvitedUserDetail(userData.data);    
    }

    invitedUser()
  },[])


  console.log("inside user jsx")
  console.log("invitedUserDetail",JSON.stringify(invitedUserDetail))

  return (
    <div className='invitedUserContainer' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className="invitedUserDetailsWrapper">
      {
      invitedUserDetail?.profilePicture ? <img src={invitedUserDetail?.profilePicture} alt="" className='invitedUserContainerLogProfile'/> :
        <Avatar className='invitedUserContainerLogo'/>
      }
      <div className="invitedUserDetails">
         <span className='invitedUserDetailsUserName'>{invitedUserDetail?.name}</span>
         <span className='invitedUserDetailsName'>{invitedUserDetail?.name}</span>
      </div>
      </div>
      
      {hover && (<button onClick={removeUserData} className='UserAddToFavButton'>Delete</button> )}
    </div>
  )
}
