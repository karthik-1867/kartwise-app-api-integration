import React from 'react'
import "./creatExpenseAddLoading.css"
export default function CreateExpenseAddUserLoadingLoading() {
  return (
    <div className='CreateExpenseAddUserLoadingContainer' >
      <div className="CreateExpenseUserLoadingContainer">
          <div className='CreateExpenseProfile' ></div>
          <div className="CreateExpenseAddUserLoadingDetails">
            <div className='CreateExpenseAddUserLoadingUserName'></div>
            <div className='CreateExpenseAddUserLoadingName'></div>
          </div>
      </div>
    </div>
  )
}
