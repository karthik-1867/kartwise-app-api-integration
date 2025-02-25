import React from 'react'
import '../createExpenseInputs/createExpenseInputs.css'
import { Avatar } from '@mui/material';

export default function CreateExpenseInputs({users,handleUserInputs}) {

  
  const userInputs = (e) => {
     const value = e.target.value;
     handleUserInputs({...users,spent:value})
  }

  return (
    <div className="CreateExpenseSheetNameUserItem">
        <div className="CreateExpenseSheetNameUserDetails">
        {users?.profilePicture ? <img className='CreateExpenseSheetNameLogo' src={users?.profilePicture} alt="" />:<Avatar/>}
        <h4>{users?.username}</h4>
        </div>
        <input type="Number" placeholder='Expense' className='CreateExpenseSheetListInput' onChange={(e)=>userInputs(e)}/>
    </div>
  )
}
