import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CreateExpenseAddUserLoadingLoading from   '../createExpenseAdduserLoadingComponent/CreateExpenseAddUserLoading';

export default function EditExpenseItem({group,selectedUser}) {

   const [groupDetail,setGroupDetail] = useState({});
   const [hovered,setHovered] = useState(false)
  const [loading,setLoading] = useState(false);

   const handleSelectedUser =()=>{
     selectedUser(groupDetail)
   }

    useEffect(()=>{
        const fetchGroup =async()=>{
            if(group)
            {
                setLoading(true)
                const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/ExpenseGroup/getExpenseGroup/${group}`,{withCredentials:true}) 
                const groupOwner = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${getCurrentLoggedInUpdate.data.groupOwner}`,{withCredentials:true})
                setGroupDetail({...getCurrentLoggedInUpdate.data,groupOwner:groupOwner.data.name})
                setLoading(false)
            }        
        }

        fetchGroup()
    },[group])

    console.log(groupDetail)

  return (
    <>
        {loading ? <CreateExpenseAddUserLoadingLoading/> :<div className="EditExpenseItem" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={handleSelectedUser}>
            <div className="EditExpenseInfo">
                <div className="EditExpenseUserDetails">

                    {groupDetail?.uploadImage ? <img className='EditAvatar' src={groupDetail?.uploadImage} alt="" /> : <Avatar className='EditAvatar'/>}
                </div>
                <div className="EditExpenseOwnerDetails">
                    {groupDetail?.title}
                    <span className="EditExpenseGroupOwner">Admin : {groupDetail?.groupOwner}</span>
                </div>
            </div>
            {hovered && <div className="EditExpenseGroupButton">
                <Edit className='EditExpenseButton'/>
                <Delete className='EditExpenseButton'/>
            </div>}  
        </div>}
    </>
  )
}
