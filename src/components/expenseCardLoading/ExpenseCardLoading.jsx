import React from 'react'
import "./expensecardloading.css"

export default function ExpenseCardLoading() {
  return (
    <div className='ExpenseCardLoadingContainer'>
        <div className="ExpenseCardLoadingUserInfo">
            <div className='ExpenseCardLoadingUserLogo' alt=""></div>
            <div className="ExpenseCardLoadingUserDetails">
                    <div className='ExpenseCardLoadingOwnerCaptilize'>
                      
                    </div>
                    <div className="ExpenseCardLoadingAndSettlementInfo">
                        <div className='ExpenseCardLoadingExpenditurespent one'></div>
                        <div className='ExpenseCardLoadingExpenditurespent two'></div>
                    </div>
                    <div className="ExpenseCardLoadingExpenditure">
                        <div className='ExpenseCardLoadingExpenditurespent three'></div>
                        <div className='ExpenseCardLoadingExpenditurereceived four'></div>
                    </div>
            </div>
        </div>
    </div>
  )
}
