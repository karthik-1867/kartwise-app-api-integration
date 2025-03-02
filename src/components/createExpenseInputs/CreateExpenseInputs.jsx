import React from 'react'
import '../createExpenseInputs/createExpenseInputs.css'
import { Avatar } from '@mui/material';

export default function CreateExpenseInputs({users,handleUserInputs}) {

  
  const userInputs = (e) => {

     handleUserInputs({id:users._id,name:users.name,expense:e.target.value})
  }

  return (
    <div className="CreateExpenseSheetNameUserItem">
        <div className="CreateExpenseSheetNameUserDetails">
        {users?.profilePicture ? <img className='CreateExpenseSheetNameLogo' src={users?.profilePicture} alt="" />:<Avatar/>}
        <h4>{users?.name}</h4>
        </div>
        <input type="Number" name="expense" placeholder='Enter Expense' className='CreateExpenseSheetListInput' onChange={(e)=>userInputs(e)}/>
    </div>
  )
}
