import React, { useState } from 'react'
import '../expenseGroups/expenseGroups.css'
import { Avatar } from '@mui/material'

export default function ExpenseGroups({group,selectedUser}) {

  const [hovered,setHovered] = useState(false)

  const handleSelectedUser = () =>{
    selectedUser(group);
  }

  return (
    <div className='ExpenseGroupContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={handleSelectedUser}>
      <div className="ExpenseGroupUserContainer">
          {group?.uploadImage ? <img className='ExpenseGroupProfile' src={group.uploadImage} alt="" />:<Avatar className='ExpenseGroupLogo'/>}
          <div className="ExpenseGroupDetails">
            <span className='ExpenseGroupUserName'>{group?.title}</span>
          </div>
      </div>
    
    {hovered &&  <button className='ExpenseGroupButton'>remove</button>}
  </div>
  )
}
