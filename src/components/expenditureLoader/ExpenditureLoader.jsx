import React from 'react'
import "./expenditureloader.css"

export default function ExpenditureLoader() {
  return (
    <div className="expenseInfoLoader">
        <div className="expenseInfoLoaderDetails">
            <div className='expenseInfoLoaderDetailsLogo' ></div>
            <div className="expenseInfoLoaderPaidOwnerAndUserInfo">
                <div className="expenseInfoLoaderPaidOwnerAndUserInfoName"></div>
                <div className="expenseInfoLoaderpaidOwnerAndStatusWrapper">
                    <div className='expenseInfoLoaderpaidstatus'></div>
                    <div className='expenseInfoLoaderpaidstatus'></div>
                </div>
                <div className="expenseInfoLoaderpaymentInfo">
                <div className='expenseInfoLoaderpendingStatus paid'></div>
                <div className='expenseInfoLoaderpendingStatus'></div>
                </div>
            </div>
        </div>
        <div className="expenseInfoLoaderExpense">
           
        </div>
    </div>
  )
}
