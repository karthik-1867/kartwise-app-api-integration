import React, { useState } from 'react'
import '../expenseCard/expenseCard.css'
import { Avatar } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function ExpenseCard({user,handleSelectedUser}) {
    const [hovered,setHovered] = useState(false)


    const selectedUser = () => {
        handleSelectedUser(user)
    }

    return (
    <div className='expenseCardContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={selectedUser}>
        <div className="expenseCardUserInfo">
            {user?.uploadImage ? <img src={user.uploadImage} className='expenseCardUserLogo' alt="" />:<Avatar className="expenseCardUserLogo"/>}
            <div className="expenseCardUserDetails">
                <span className='OwnerCaptilize'>
                    
                    {user?.groupName}
                    </span>
                <span className='expenseCardExpenditurespent'> paid by : {user?.owner}</span>
                <div className="expenseCardExpenditure">
                    <span className='expenseCardExpenditurespent red'> spent : {user?.paid} rs</span>
                    <span className='expenseCardExpenditurereceived green'>received : {user?.ownerReceived} rs</span>
                </div>
            </div>
        </div>
        {hovered && <div className="expenseCardButtons">
            <Link to="/expenseSummary/test" style={{textDecoration:'none',color:'inherit'}}>
 
            <button className="expenseCardButton"><Edit/></button>
            </Link>
            <button className="expenseCardButton"><Delete/></button>
        </div>}
    </div>
  )
}
