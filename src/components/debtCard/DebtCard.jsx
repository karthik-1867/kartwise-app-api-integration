import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function DebtCard({dept,selectedUser}) {
   
    const [sentPaidBack,setSentaidBack] = useState();
    const [ackStatus,setAckStatus] = useState();
    const handleSelectedExpense = () => {
        selectedUser(dept);
    }



    useEffect(()=>{

    const fetchAckMessage = async() => {

        console.log("deg",dept)
        if(dept)
        {
            const currentLoggedin = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${dept?.id}`,{withCredentials:true})
           
            const acknowledgeid = currentLoggedin.data.AcknowledgeMessageStatus
            console.log("gfhgj",acknowledgeid)
            const acknowledgeMessage = []
            for (let i of acknowledgeid){
                const currentLoggedin = await axios.get(`${process.env.REACT_APP_URL}/acknowledge/getMessage/${i.ackid}`,{withCredentials:true})
                if(dept.groupid==i.groupid)
                
                {
                    acknowledgeMessage.push(currentLoggedin.data)
                }   
            }

            console.log("asjdh",acknowledgeMessage)
            if(acknowledgeMessage?.length>0){
                const totalPaidBack = acknowledgeMessage.filter((i)=>(i.acknowledgeStatus === 'pending')).reduce((i,c)=>(i+c.paidBack),0)
                
                setSentaidBack(totalPaidBack);
                
            }
        }
    }

        fetchAckMessage();
    },[])

    return (
    <div className='expenseCardContainer' >
    <div className="expenseCardUserInfo" onClick={handleSelectedExpense}>
        <Avatar className="expenseCardUserLogo"/>
        <div className="expenseCardUserDetails">
                <span className='OwnerCaptilize'>        
                {dept?.groupName}
                </span>
                <div className="ExpenseOwnerAndSettlementInfo">
                    <span className='expenseCardExpenditurespent'>owner : {dept?.owner}</span>
                    {sentPaidBack!=0 && <span className='expenseCardExpenditurespent'>payment sent : {sentPaidBack}</span>}
                    {ackStatus && <span className='expenseCardExpenditurespent'>acknowlegde Status : {ackStatus}</span>}
                </div>
            <div className="expenseCardExpenditure">
                <span className='expenseCardExpenditurespent red'> expense : {dept?.expense}rs</span>
                <span className='expenseCardExpenditurereceived green'>paid back :  {dept?.paidBack}rs</span>
            </div>
        </div>
    </div>
</div>
  )
}
