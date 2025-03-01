import { Avatar } from '@mui/material';
import axios from 'axios';
import "../expenseInfoSt/expenseInfoSt.css"
import React, { useEffect, useState } from 'react'
import ExpenseInfoStLoader from '../expenseInfoStLoader/ExpenseInfoStLoader';

export default function ExpenseInfoSt({expenseInfo}) {

  const [info,setInfo] = useState();
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
      const fetchExpenseInfo = async() =>{
        setLoading(true)
        const expenseDetails = await axios.get(`${process.env.REACT_APP_URL}/expense/getExpenseDetails/${expenseInfo}`,{withCredentials:true})
        setInfo(expenseDetails.data)
        setLoading(false)  
    }

      fetchExpenseInfo();
  },[expenseInfo])

  return (
    <>
    { loading ? <ExpenseInfoStLoader/>:<div className='expenseGroupDetailContainer'>
        <div className="expenseGroupDetailContainerDetails">
            {info?.uploadImage ? <img src={info?.uploadImage} alt="" className='expenseGroupDetailContainerLogo'/>:<Avatar/>}
            <div className="ExpenseUserAndDetails">
                
                {info?.groupName}
                <span className='ExpenseGroupNameAndOwnerInfo'>owner : {info?.owner}</span>
                
                <div className="ExpenseSpendAndPaid">
                    <span className='spent'>spent :<span>{info?.paid}rs</span></span>
                    <span className='recived1'>recived :<span>{info?.ownerReceived}rs</span></span>
                </div>
            </div>
        </div>
        <button className='UserAddToFavButton1'>remove</button>
    </div>
   }</>
  )
}
