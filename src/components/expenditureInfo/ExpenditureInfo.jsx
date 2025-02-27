import React from 'react'
import "../expenditureInfo/expenditure.css"
import { Avatar } from '@mui/material'

export default function ExpenditureInfo({individualRecord}) {
  return (
    <div className="expenseGroupExpenditureSummaryUser">
        <div className="expenseGroupExpenditureSummaryUserDetails">
            {individualRecord?.profilePicture ? <img className='expenseGroupExpenditureSummaryUserDetailsLogo' src={individualRecord.profilePicture} alt="" /> :<Avatar className='expenseGroupExpenditureSummaryUserDetailsLogo'/>}
            <div className="PaidOwnerAndUserInfo">
            {individualRecord?.name}
            <div className="paidOwnerAndStatusWrapper">
            <span className='status'>status : {individualRecord?.status}</span>
            {individualRecord?.owner &&<span className='status'>owner</span>}
            </div>
            <div className="paymentInfo">
              <span className='pendingStatus paid'>paid : {individualRecord?.paidBack}rs</span>
              <span className='pendingStatus'>expense : {individualRecord?.expense}rs</span>
            </div>
            </div>
        </div>
        <div className="expenseGroupExpenditureSummaryUserExpense">
            Balance : {individualRecord?.expense-individualRecord?.paidBack} RS
        </div>
    </div>
  )
}
