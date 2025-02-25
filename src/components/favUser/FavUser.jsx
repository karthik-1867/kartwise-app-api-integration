import React, { useState } from 'react'
import '../favUser/favUser.css'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess } from '../../redux/userSlice';

export default function FavUser({user}) {

  const [hovered,setHovered] = useState(false);
  const favUser = useSelector((state)=>state.user.user);
  const dispatch = useDispatch()
  const removeUser = () => {
    const updatedFavUser = favUser.filter(item => item.id !== user?.id);
    dispatch(loginStart);
    dispatch(loginSuccess(updatedFavUser));
  }
  return (
    <div className='favUserContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <div className="favUserContainerDetails">
            {user?.profilePicture ? <img src={user?.profilePicture} alt="" className='favUserContainerDetailsImage'/>:<Avatar/>}
            {user?.username}
        </div>
        {hovered && <button onClick={removeUser} className='UserAddToFavButton1'>remove</button>}
    </div>
  )
}
