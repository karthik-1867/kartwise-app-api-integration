import { Info } from '@mui/icons-material'
import React from 'react'
import "./updateCoponentLoader.css"

export default function UpdateComponentLoader() {
  return (
    <div className="UpdateContainerLoading">
        <div className="UpdateContainerLoadingTop">
            <div className="UpdateContainerLoadingUserDetails">
                <div className='UpdateContainerLoadingProfile' ></div>
                <div className='UpdateContainerLoadingName'></div>
                <div className='UpdateContainerLoadingPaid'></div>
                <div className='UpdateContainerLoadingExpense'></div>
                <div className='UpdateContainerLoadingRemaining'></div>
            </div>
            
            <input className="UpdateContainerLoadingInput" name="paidBack" type='Number' placeholder='enter amount to be paid'/>
        </div>
        <div className="UpdateContainerLoadingBottom">
            <Info/>
           <div className='UpdateContainerLoadingBottomLoading'></div>
           <div className='UpdateContainerLoadingBottomLoadingShort'></div>
           <div className='UpdateContainerLoadingBottomLoadingmedium'></div>
        </div>

    </div>
  )
}
