import React from 'react'
import "./createexpenseinputloading.css"


export default function CreateExpenseInputLoading() {
  return (
    <div className="CreateExpenseInputLoadingNameUserItem">
        <div className="CreateExpenseInputLoadingNameUserDetails">
            <div className='CreateExpenseInputLoadingNameLogo'></div>
            <div className="inputsLoading">
                <div className="createExpenseInputbig"></div>
                <div className="createExpenseInputSmall"></div>
            </div>
        </div>
        <input type="Number" name="expense" placeholder='Expense' className='CreateExpenseInputLoadingListInput'/>
    </div>
  )
}
