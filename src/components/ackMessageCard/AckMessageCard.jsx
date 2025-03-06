import { Info } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../ackMessageCard/ackMessage.css"

export default function AckMessageCard({ack,acceptRequest,rejectRequest}) {

  const [expenseInfo,setExpenseInfo] = useState();

  console.log("expenseinfo",expenseInfo)

  const accept = () => {
     acceptRequest(expenseInfo)
  } 

  const reject = () => {     
    rejectRequest(expenseInfo)
  }



  useEffect(()=>{
    const getMessage = async()=>{

        const acknowledgeMessage = await axios.get(`${process.env.REACT_APP_URL}/acknowledge/getMessage/${ack}`,{withCredentials:true})
        setExpenseInfo(acknowledgeMessage.data)
    }

    getMessage();
  },[])

  return (
    <div className="UpdateContainer">
    <div className="UpdateContainerTop">
        <div className="UpdateContainerUserDetails">
            {expenseInfo?.profilePicture ?<img src={expenseInfo?.profilePicture} alt="" className='updateExpenseProfile' />:<Avatar/>}
            {expenseInfo?.name}
            {` `}
            <span className='UpdateContainerExpense'>Group :{expenseInfo?.groupName}</span>
            <span className='UpdateContainerPaid'>paid : {expenseInfo?.paidBack}</span>
            <span className='UpdateContainerRemaining'>expense : {expenseInfo?.expense}</span>
        </div>
        <div className="AcceptOrReject">
            <button onClick={accept} className="requestButton">Accept</button>
            <button onClick={reject} className="requestButton">Reject</button>
        </div>
    </div>
</div>
  )
}
