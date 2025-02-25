import React from 'react'
import '../expenseDetails/expenseDetails.css'
import { Avatar } from '@mui/material'
export default function ExpenseDetails({groupDetail}) {
  return (
    <div className='favUserContainer'>
        <div className="favUserContainerDetails">
            {groupDetail?.uploadImage ? <img src={groupDetail?.uploadImage} alt="" className='favUserContainerLogo'/>:<Avatar/>}
            <div className="ExpenseUserAndDetails">
                {groupDetail?.title}
                <div className="ExpenseSpendAndPaid">
                    <span className='spent'>Spent :<span>+{groupDetail?.spent}</span></span>
                    <span className='recived1'>paid :<span>-{groupDetail?.recived}</span></span>
                </div>
            </div>
        </div>
        <button className='UserAddToFavButton1'>remove</button>
    </div>
  )
}
