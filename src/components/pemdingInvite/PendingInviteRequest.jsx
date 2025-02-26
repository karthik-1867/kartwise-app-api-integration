import React, { useEffect, useState } from 'react'
import '../pemdingInvite/pendingInviteRequest.css'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess } from '../../redux/userSlice';
import axios from 'axios';

export default function PendingInviteRequest({userData,removePendingUser}) {

  const [hovered,setHovered] = useState(false);
  const [userDetails,setUserDetails] = useState({});
  const currentUser = useSelector((state)=>state.user.user)
  const dispatch = useDispatch()

  console.log("reached pending",userDetails)

  const removeUser = async() => {
     removePendingUser(userData)
  }

  useEffect(()=>{
    const invitedUser = async() => {
      const inviteduser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${userData}`,{withCredentials:true})
      setUserDetails(inviteduser.data)
    }

    invitedUser()
  },[])

  return (
    <div className='PendingInviteUserContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <div className="PendingInviteUserContainerDetails">
            {userDetails?.profilePicture ? <img src={userDetails?.profilePicture} alt="" className='PendingInviteUserContainerDetailsImage'/>:<Avatar/>}
            {userDetails?.name}
        </div>
        {hovered && <button onClick={removeUser} className='UserAddToFavButton1'>remove</button>}
    </div>
  )
}
