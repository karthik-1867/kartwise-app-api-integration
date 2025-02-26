import React, { useEffect, useState } from 'react'
import '../incomingInvite/incomingInviteRequest.css'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess } from '../../redux/userSlice';
import axios from 'axios';

export default function IncomingInviteRequest({userData,accept,reject}) {

  const [hovered,setHovered] = useState(false);
  const [userDetails,setUserDetails] = useState({});
  const currentUser = useSelector((state)=>state.user.user)
  const dispatch = useDispatch()

  console.log("reached pending",userDetails)

  const rejectUser = async() => {
    reject(userData)
  }

  const acceptUser = async() => {
    accept(userData);
  }

  useEffect(()=>{
    const incomingInvitedUser = async() => {
      const inviteduser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${userData}`,{withCredentials:true})
      setUserDetails(inviteduser.data)
    }

    incomingInvitedUser()
  },[])

  return (
    <div className='IncomingInviteUserContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <div className="IncomingInviteUserContainerDetails">
            {userDetails?.profilePicture ? <img src={userDetails?.profilePicture} alt="" className='IncomingInviteUserContainerDetailsImage'/>:<Avatar/>}
            {userDetails?.name}
        </div>
        {hovered && 
        <>
        <div className="IncomingRequestButtonWrapper">
          <button onClick={acceptUser} className='UserAddToFavButton1'>Accept</button>
          <button onClick={rejectUser} className='UserAddToFavButton1'>reject</button>
        </div>
        </>
        }
    </div>
  )
}
