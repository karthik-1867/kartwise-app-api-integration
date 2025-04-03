import React, { useEffect, useState } from 'react'
import "./editExpenseGroup.css"
import { Avatar } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import EditExpenseItem from '../../components/editExpenseItem/EditExpenseItem'
import { useSelector } from 'react-redux'
import axios from 'axios'
import User from '../../components/user/User'
import HomeLoadingComponent from '../../components/homeLoaderComponent/HomeLoadingComponent'
import Members from '../../components/members/Members'


export default function EditExpenseGroup({search}) {
  const currentUser = useSelector((state)=>state.user.user);
  const [group,setGroup] = useState([]);
  const [members,setMembers] = useState([]);
  const [groupInfo,setGroupInfo] = useState();
  console.log("hgjew",groupInfo)

  const selectedUser = async(group) => {
    console.log("ids",group)
    const getCurrentLoggedInUpdate = await axios.post(`${process.env.REACT_APP_URL}/expense/memberDetails`,{members:[...group.members]},{withCredentials:true})
    setMembers([...getCurrentLoggedInUpdate.data])
    setGroupInfo(group)
}

  useEffect(()=>{
     setGroup(currentUser.createExpenseGroup)
     const selectFirstGroup = async() => {
       const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/ExpenseGroup/getExpenseGroup/${currentUser.createExpenseGroup[0]}`,{withCredentials:true})
       const groupOwner = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${getCurrentLoggedInUpdate.data.groupOwner}`,{withCredentials:true})
       selectedUser({...getCurrentLoggedInUpdate.data,groupOwner:groupOwner.data.name})
    }

     if(currentUser.createExpenseGroup.length>0){
      selectFirstGroup();
     }
  },[currentUser])


  useEffect(()=>{
    console.log("seadteh",search)
    const searchRes = async()=>{
     if(search)
     {
      const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/ExpenseGroup/searchExpenseGroup`,{search},{withCredentials:true});
      console.log("searcged data group",currentUserData.data)
      const ids = currentUserData.data.map((i)=>i._id)
      setGroup([...ids]);

     }else{
      setGroup([...currentUser.createExpenseGroup])
     }
    }

    const debounceTimeout = setTimeout(() => {
      searchRes()
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);

    };

 },[search])

  return (
    <div className='EditExpenseGroup'>
       <div className="EditExpenseChooseGroup">
         <h1>Choose Expense Group</h1>
         <ul  className='EditExpenseGroupList'>
            {group.map((item)=>(
                <li >
                    <EditExpenseItem group={item} selectedUser={selectedUser}/>
                </li>
            ))
            }
         </ul>
       </div>
       {members.length>0 && <div className="EditExpenseChooseGroup2">
         <div className="EditWarpper">
            <h1>Expense Info</h1>
            {groupInfo?.uploadImage ? <img src={groupInfo?.uploadImage} alt="" className='ExpenseInfoAvatar'/>:<Avatar className='ExpenseInfoAvatar'/>}
            <span className='EditExpenseGroupName'>Group Name : {groupInfo?.title}</span>
            <span className='EditExpenseGroupName'>Total members : {groupInfo?.members.length}</span>
            <span className='EditExpenseGroupName'>Group owner : {groupInfo?.groupOwner}</span>
         </div>
         <div className="EditListWrapper">
            <h1>Members</h1>
            <ul  className='EditExpenseGroupList'>
                {members?.map((item)=>(
                  <Members member={item}/>
                ))
                }
            </ul>
         </div>
       </div>}
    </div>
  )
}
