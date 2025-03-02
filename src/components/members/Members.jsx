import { Avatar } from '@mui/material'
import React from 'react'

export default function Members({member}) {
  
  
  return (
    <li className='ClickedMember'>
    {member?.profilePicture ? <img src={member?.profilePicture} className='memberprofilepic'/> :<Avatar className='EditAvatar'/>}
    <span>{member?.name}</span>
   </li> 
  )
}
