import React from 'react'
import "../expenditureInfo/expenditure.css"
import { Avatar } from '@mui/material'

export default function ExpenditureInfo({individualRecord}) {
  return (
    <div className="expenseGroupExpenditureSummaryUser">
        <div className="expenseGroupExpenditureSummaryUserDetails">
            {individualRecord?.profilePicture ? <img className='expenseGroupExpenditureSummaryUserDetailsLogo' src={individualRecord.profilePicture} alt="" /> :<Avatar className='expenseGroupExpenditureSummaryUserDetailsLogo'/>}
            <div className="PaidOwnerAndUserInfo">
            {individualRecord?.username}
            <span className='status'>status : pending</span>
            <div className="paymentInfo">
              <span className='pendingStatus paid'>paid : 30rs</span>
              <span className='pendingStatus'>expense : 30rs</span>
            </div>
            </div>
        </div>
        <div className="expenseGroupExpenditureSummaryUserExpense">
            {individualRecord?.spent} rs
        </div>
    </div>
  )
}
