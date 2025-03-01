import React, { useEffect, useState } from 'react'
import '../expenseDetails/expenseDetails.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import axios from 'axios'
import "../expenseDetailsloader/expenseDetailsLoader.css"

export default function ExpenseDetailsLoader() {
  return (
    <div className='expenseGroupDetailContainerLoader'>
        <div className="expenseGroupDetailContainerLoaderDetails">
            <div className='expenseGroupDetailContainerLoaderLogo'/>
            <div className="ExpenseUserAndDetailsLoader">
                <div className="ExpenseUserAndDetailsLoaderTitle"/>
                <div className="ExpenseSpendAndPaidLoader">
                    <div className='spentLoader'></div>
                    <div className='recived1Loader'></div>
                </div>
            </div>
        </div>
        <div className="expenseGroupDetailsLoaderButton"/>
    </div>
  )
}
