import React, { useEffect, useState } from 'react'
import '../expenseDetails/expenseDetails.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ExpenseDetailsLoader from '../expenseDetailsloader/ExpenseDetailsLoader'
import { Delete, Edit, EditAttributes } from '@mui/icons-material'
export default function ExpenseDetails({group}) {

  const [groupDetail,setGroupDetail] = useState()
  const [loading,setLoading] = useState(false)
  const [hovered,setHovered] = useState(false)
  const user = useSelector((state)=>state.user.user);

  console.log("hrereh",JSON.stringify(groupDetail))
  useEffect(()=>{
    const fetchGroup = async()=>{
      if(group)
      {
        setLoading(true)
        const getCurrentGroup = await axios.get(`${process.env.REACT_APP_URL}/ExpenseGroup/getExpenseGroup/${group}`,{withCredentials:true})
        setGroupDetail(getCurrentGroup.data)
        setLoading(false)
       }
    }

   fetchGroup();
  },[group])

  return (
    <>
    { loading ? <ExpenseDetailsLoader/> :
      <div className='expenseGroupDetailContainer' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <div className="expenseGroupDetailContainerDetails">
            {groupDetail?.uploadImage ? <img src={groupDetail?.uploadImage} alt="" className='expenseGroupDetailContainerLogo'/>:<Avatar/>}
            <div className="ExpenseUserAndDetails">
                {groupDetail?.title}
                <div className="ExpenseSpendAndPaid">
                    <span className='spent'>Spent :<span>{groupDetail?.spent}rs</span></span>
                    <span className='recived1'>paid :<span>{groupDetail?.received}rs</span></span>
                </div>
            </div>
        </div>
        {groupDetail?.groupOwner == user._id  && <div style={{display:"flex",alignItems:"center",gap:"3px"}}>
            <Edit className='editButton'/>
            <Delete className='editButton'/>
        </div>}
    </div>}
    </>
  )
}
