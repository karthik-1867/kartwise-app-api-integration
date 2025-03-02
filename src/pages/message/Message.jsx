import React, { useEffect, useState } from 'react'
import '../message/message.css'
import { Avatar } from '@mui/material'
import { AttachFile } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import Notification from '../../components/notification/Notification'


export default function Message() {
    const currentUser = useSelector((state)=>state.user.user)
    const [notifications,setNotifications] = useState([]);

    useEffect(()=>{
       
       if(currentUser?.Notifications)
       {
        console.log("before",currentUser?.Notifications)
        const arrayTobeSorted = [...currentUser?.Notifications]
        const sortedNotification = arrayTobeSorted?.sort((a,b)=>(b.localeCompare(a)))
       console.log("before af",sortedNotification)
       setNotifications([...sortedNotification])
       }
    },[])

    return (
    //  <div className="sMessageContainer">

      <div className="MessageWrapperAndFilters">
        <div className="MessageWrapperAndHeader">
            <h1>Notification</h1>
            <div className="MessageWrapper">
                 {notifications.map((item)=>(
                     <Notification notifications={item}/>
                 ))
                }
            </div>
        </div>  
      <div className="MessageFilter">
        <h1>Filters</h1>
        <div className="MessageHighPriorty">
            Sort by high priority
        </div>
        <div className="MessageLowPriority">
           Sort by low priority
        </div>
        
      </div>
      </div>
    //  </div>

  )
}
