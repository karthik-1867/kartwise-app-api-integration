import React, { useEffect, useState } from 'react'
import '../expenseCard/expenseCard.css'
import { Avatar } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ExpenseCardLoading from '../expenseCardLoading/ExpenseCardLoading'

export default function ExpenseCard({user,handleSelectedUser,handleExpenseDelete,handleError}) {
    const [hovered,setHovered] = useState(false)
    const [userDetails,setUserDetails] = useState();
    const currentUser = useSelector((state)=>state.user.user);
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    console.log("currentUser",JSON.stringify(error))

    const selectedUser = async() => {
        handleSelectedUser(userDetails._id)
    }

    const handlerError = (e,type) => {
        e.stopPropagation()
        const message = `ownly owner can ${type} this that is ${userDetails.owner}`
        handleError(message)

    }

    const handleDelete = (e) => {
        setLoading(true)
        e.stopPropagation()
        handleExpenseDelete(userDetails._id)
    }

    useEffect(()=>{
        const fetchExpense = async()=>{

            setLoading(true)
            const userData = await axios.get(`${process.env.REACT_APP_URL}/expense/getExpenseDetails/${user}`,{withCredentials:true})
            console.log("expense details "+JSON.stringify(userData.data))
            setUserDetails(userData.data);
            setLoading(false)
        }

        fetchExpense()
    },[user])

    return (
    <>
    { loading ?
        <ExpenseCardLoading/>
        :
        <div className='expenseCardContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={selectedUser}>
        <div className="expenseCardUserInfo">
            {userDetails?.uploadImage ? <img src={userDetails.uploadImage} className='expenseCardUserLogo' alt="" />:<Avatar className="expenseCardUserLogo"/>}
            <div className="expenseCardUserDetails">
                <span className='OwnerCaptilize'>
                    
                    {userDetails?.groupName}
                    </span>
                    <div className="ExpenseOwnerAndSettlementInfo">
                        <span className='expenseCardExpenditurespent'> paid by : {userDetails?.owner}</span>
                        {userDetails?.allSettled == "allSettled" && <span className="expenseCardExpenditurespent green">settled</span>}
                    </div>
                <div className="expenseCardExpenditure">
                    <span className='expenseCardExpenditurespent red'> spent : {userDetails?.paid} rs</span>
                    <span className='expenseCardExpenditurereceived green'>received : {userDetails?.ownerReceived} rs</span>
                </div>
            </div>
        </div>
        {hovered && 
           ((currentUser?.name == userDetails?.owner) ? <div className="expenseCardButtons">
            <Link to={`/expenseSummary/${user}`} style={{textDecoration:'none',color:'inherit'}}>
 
            <button className="expenseCardButton"><Edit/></button>
            </Link>
            <button onClick={(e)=>handleDelete(e)} className="expenseCardButton"><Delete/></button>
        </div>
        :
        <div className="expenseCardButtons"> 
            <button onClick={(e)=>{handlerError(e,'edit')}} className="expenseCardButton red"><Edit/></button>
            <button onClick={(e)=>{handlerError(e,'delete')}} className="expenseCardButton red"><Delete/></button>
        </div>)
        }
    </div>
    }</>
  )
}
