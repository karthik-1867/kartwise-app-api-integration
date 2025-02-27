import { Info } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useState } from 'react'

export default function UpdateExpenseCard({expenseInfo,handleInputs}) {
  let input = {id:expenseInfo?.id,expense:expenseInfo?.expense,paidBack:0};

  const handleInput = (e) =>{
    input = {...input,paidBack:Number(e.target.value),alreadyPaid:Number(expenseInfo?.paidBack)}
    handleInputs(input);
  }

  

  
  return (
        <div className="UpdateContainer">
        <div className="UpdateContainerTop">
            <div className="UpdateContainerUserDetails">
                {expenseInfo?.profilePicture ?<img src={expenseInfo?.profilePicture} alt="" className='updateExpenseProfile' />:<Avatar/>}
                {expenseInfo?.name}
                <span className='UpdateContainerPaid'>paid : {expenseInfo?.paidBack}</span>
                <span className='UpdateContainerExpense'>expense : {expenseInfo?.expense}</span>
                <span className='UpdateContainerRemaining'>Remaining : {expenseInfo?.expense-expenseInfo?.paidBack}</span>
            </div>
            
            <input className="UpdateContainerInput" name="paidBack" type='Number' placeholder='enter amount to be paid' max={expenseInfo?.expense-expenseInfo?.paidBack} onChange={(e)=>handleInput(e)}/>
        </div>
        <div className="UpdateContainerBottom">
            <Info/>

            {expenseInfo?.status == 'paid' && <span>Settled amount of {expenseInfo?.expense}</span>}
            {expenseInfo?.status == 'pending' && <span>Need to pay {expenseInfo?.expense}</span>}
            {expenseInfo?.status == 'partially paid' && <span>paid {expenseInfo?.paidBack} and need to pay {expenseInfo?.expense-expenseInfo?.paidBack}</span>}
        </div>

    </div>
  )
}
