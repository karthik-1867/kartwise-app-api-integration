import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

export default function AckCard({ackid}) {


  const [ack,setAck] = useState()
  console.log("asasd",ack)


  useState(()=>{
    const fetchMessage = async()=>{

      if(ackid?.ackid){

        const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/acknowledge/getMessage/${ackid?.ackid}`,{withCredentials:true})
        setAck(getCurrentLoggedInUpdate.data);
      }
    }

    fetchMessage();
  },[ackid])

  return (
    <div className='expenseCardContainer' >
    <div className="expenseCardUserInfo">
        <Avatar className="expenseCardUserLogo"/>
        <div className="expenseCardUserDetails">
                <span className='OwnerCaptilize'>        
                {ack?.groupName}
                </span>
                <div className="ExpenseOwnerAndSettlementInfo">
                    <span className='expenseCardExpenditurespent'>owner : {ack?.owner}</span>
                    {ack?.paidBack && <span className='expenseCardExpenditurespent'>payment sent : {ack.paidBack}</span>}
                    {ack?.acknowledgeStatus && <span className='expenseCardExpenditurespent'>acknowlegde Status : {ack.acknowledgeStatus}</span>}
                </div>
        </div>
    </div>
</div>
  )
}
