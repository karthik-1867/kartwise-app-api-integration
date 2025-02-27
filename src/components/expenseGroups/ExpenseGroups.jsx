import React, { useEffect, useState } from 'react'
import '../expenseGroups/expenseGroups.css'
import { Avatar } from '@mui/material'
import axios from 'axios';

export default function ExpenseGroups({group,selectedUser}) {

  const [hovered,setHovered] = useState(false)
  const [groupDetail,setGroupDetail] = useState();

  const handleSelectedUser = () =>{
    selectedUser(groupDetail.members,group);
  }



  useEffect(()=>{
    
    const fetchGroup = async()=>{
      const userData = await axios.get(`${process.env.REACT_APP_URL}/ExpenseGroup/getExpenseGroup/${group}`,{withCredentials:true})
      setGroupDetail(userData.data);
    }

    fetchGroup();

  },[])

  return (
    <div className='ExpenseGroupContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={handleSelectedUser}>
      <div className="ExpenseGroupUserContainer">
          {groupDetail?.uploadImage ? <img className='ExpenseGroupProfile' src={groupDetail.uploadImage} alt="" />:<Avatar className='ExpenseGroupProfile'/>}
          <div className="ExpenseGroupDetails">
            <span className='ExpenseGroupUserName'>{groupDetail?.title}</span>
          </div>
      </div>
    
    {hovered &&  <button className='ExpenseGroupButton'>remove</button>}
  </div>
  )
}
