import React, { useEffect, useState } from 'react'
import '../createExpenseAddUser/createExpenseAddUser.css'
import { Avatar } from '@mui/material'
import axios from 'axios';
import CreateExpenseAddUserLoadingLoading from '../createExpenseAdduserLoadingComponent/CreateExpenseAddUserLoading';

export default function CreateExpenseAddUser({user,addUser,removeUser,selectedUser,isSelectedUser}) {
 
  const [hovered,setHovered] = useState(false);
  const [invitedUser,setInvitedUser] = useState("");
  const [loading,setLoading] = useState(false)
  const addExpenseUser = () => {
    addUser(user);
  }

  const removeExpenseUser = () => {
    removeUser(user);
  }


  useEffect(()=>{
    const invitedGuy =async()=> {
      setLoading(true)
      const invited = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})
      console.log("adwdad",invited.data);
      setInvitedUser(invited.data);
      setLoading(false);
    }

    invitedGuy();
  },[])


  return (
   <>
   {loading ? 
   <CreateExpenseAddUserLoadingLoading/>
   :
   <div className='CreateExpenseAddUserContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div className="CreateExpenseUserContainer">
          {invitedUser?.profilePicture ? <img className='CreateExpenseProfile' src={invitedUser.profilePicture} alt="" />:<Avatar className='CreateExpenseAddUserLogo'/>}
          <div className="CreateExpenseAddUserDetails">
            <span className='CreateExpenseAddUserUserName'>{invitedUser?.name}</span>
            <span className='CreateExpenseAddUserName'>{invitedUser?.name}</span>
          </div>
      </div>
    
    {hovered && (isSelectedUser=='true' ? <button className='CreateExpenseAddUserButton' onClick={removeExpenseUser}>remove</button> : <button className='CreateExpenseAddUserButton' onClick={addExpenseUser}>Add To Create List</button>)}
  </div>}
   </>
  )
}
