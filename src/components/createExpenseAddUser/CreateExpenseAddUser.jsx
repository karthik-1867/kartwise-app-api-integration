import React, { useState } from 'react'
import '../createExpenseAddUser/createExpenseAddUser.css'
import { Avatar } from '@mui/material'

export default function CreateExpenseAddUser({user,addUser,removeUser,selectedUser,isSelectedUser}) {
 
  const [hovered,setHovered] = useState(false);

  const addExpenseUser = () => {
    addUser(user);
  }

  const removeExpenseUser = () => {
    removeUser(selectedUser?.id);
  }

  const userData = isSelectedUser=='true' ?  selectedUser : user;

  return (
    <div className='CreateExpenseAddUserContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div className="CreateExpenseUserContainer">
          {userData?.profilePicture ? <img className='CreateExpenseProfile' src={userData.profilePicture} alt="" />:<Avatar className='CreateExpenseAddUserLogo'/>}
          <div className="CreateExpenseAddUserDetails">
            <span className='CreateExpenseAddUserUserName'>{userData?.username}</span>
            <span className='CreateExpenseAddUserName'>{userData?.username}</span>
          </div>
      </div>
    
    {hovered && (isSelectedUser=='true' ? <button className='CreateExpenseAddUserButton' onClick={removeExpenseUser}>remove</button> : <button className='CreateExpenseAddUserButton' onClick={addExpenseUser}>Add To Create List</button>)}
  </div>
  )
}
