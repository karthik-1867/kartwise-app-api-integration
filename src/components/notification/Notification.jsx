import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format, render, cancel, register } from 'timeago.js';

export default function Notification({notifications}) {

   const [notificationDetails,setNotificationDetails] = useState();

   console.log("ur notification",JSON.stringify(notificationDetails))
    useEffect(()=>{

        const fetchNotication = async() =>{
            if(notifications){

                const getNotification = await axios.get(`${process.env.REACT_APP_URL}/notification/getNotification/${notifications}`,{withCredentials:true})
                setNotificationDetails(getNotification.data)
            }
        }

        fetchNotication();
    },[notifications])

  return (
        <div className="Message recived">
        <div className="MessageDetails">
            <div className="MessageUserName">
                <Avatar className='MessageAvatar'/>
                karthik
                {notificationDetails?.groupName && <span className='MessageDetail'>Group Name : {notificationDetails?.groupName}</span>}
                {notificationDetails?.ExpenseName && <span className='MessageDetail'>Expense Name : {notificationDetails?.ExpenseName}</span>}
                {notificationDetails?.ExpenseOwner && <span className='MessageDetail'>Expense owner : {notificationDetails?.ExpenseOwner}</span>}
            </div>
            <span className="MessageTimeStamp">{format(notificationDetails?.createdAt)}</span>
        </div>
        <hr/>
        <span className="MessageContent">{notificationDetails?.message}</span>
    </div>
  )
}
