import React, { useEffect, useState } from 'react'
import '../inviteAcceptedUser/inviteaccepteduser.css'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess } from '../../redux/userSlice';
import axios from 'axios';

export default function FavUser({user}) {

  const [hovered,setHovered] = useState(false);
  const [invitedUser,setInvitedUser] = useState();

  console.log("invited use",invitedUser)
  const removeUser = () => {
    const updatedFavUser = invitedUser.filter(item => item.id !== user?.id);

  }


  useEffect(()=>{
    const fetchUserDetails = async() =>{

      const getCurrentUser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})
      setInvitedUser(getCurrentUser.data)
    }

    fetchUserDetails()
  },[user])

  return (
    <div className='favUserContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <div className="favUserContainerDetails">
            {invitedUser?.profilePicture ? <img src={invitedUser?.profilePicture} alt="" className='favUserContainerDetailsImage'/>:<Avatar/>}
            {invitedUser?.name}
        </div>
        {hovered && <button onClick={removeUser} className='UserAddToFavButton1'>remove</button>}
    </div>
  )
}
