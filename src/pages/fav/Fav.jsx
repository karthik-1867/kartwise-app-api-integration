import React, { useEffect, useState } from 'react'
import '../fav/fav.css'
import User from '../../components/user/User'
import FavUser from '../../components/inviteAcceptedUser/FavUser'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CurrencyRupee, Group, PersonAdd } from '@mui/icons-material'
import InvitedUsers from '../../components/invitedUsers/InvitedUsers'
import ExpenseInfoSt from '../../components/expenseInfoSt/ExpenseInfoSt'
import ExpenseDetailsLoader from '../../components/expenseDetailsloader/ExpenseDetailsLoader'
import ExpenseInfoStLoader from '../../components/expenseInfoStLoader/ExpenseInfoStLoader'
import { io } from "socket.io-client";
import { loginStart, loginSuccess } from '../../redux/userSlice'
import axios from 'axios';

export default function Fav() {

   const currentUser = useSelector((state)=>state.user.user)
   const [user,setUser] = useState([]);
   const [group,setGroup] = useState([]);
   const [expenseInfo,setExpenseInfo] = useState([]);
    const dispatch = useDispatch();

  useEffect(()=>{
      const socket = io(`${process.env.REACT_APP_URL}`, {
        withCredentials: true,
      });
    
      socket.on("connect", () => {
        console.log("Socket connected", socket.id);
      });


        const fetchUser =async()=>{
          console.log(process.env.REACT_APP_URL);
          try{
            setUser([])
            const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})
            dispatch(loginStart())
            dispatch(loginSuccess(getCurrentLoggedInUpdate.data))
            
            setUser([...getCurrentLoggedInUpdate.data.inviteAcceptedUsers])
            setGroup([...getCurrentLoggedInUpdate.data.createExpenseGroup])
            setExpenseInfo([...getCurrentLoggedInUpdate.data.createExpenseInfo])
          }catch(e){
            console.log("error"+e.message)
          }
        }
     
      socket.on("expenseUpdated", () => {
        console.log("Expense update received");
        fetchUser(); 
      });
    
        return () => {
          socket.disconnect();
        };
},[])


  return (
    <div className='favContainer'>
      <div className="HomeBar">
        <div className="HomeSummary">
          <div className="HomeSummaryBoxes">
            <div className="HomeSummaryTitle">
              <CurrencyRupee className='HomeSummaryIcon'/>
              Group Expense summary
            </div>
              <div className="HomeSummaryBoxDetailsGroup">
                <span className="HomeAmountSpent">
                  expense : {currentUser?.expenditure}rs
                </span>
                <span className='HomeAmountReceived'>
                  recovered : {currentUser?.recoveredExpenditure}rs
                </span>
                <span className='HomeAmountReceived'>
                 You paid : {currentUser?.paidBack}rs
                </span>
            </div>
          </div>
          <div className="HomeSummaryBoxes">
            <div className="HomeSummaryTitle">
              <Group className='HomeSummaryIcon'/>
              Total groups
            </div>
            <div className="HomeSummaryBoxDetailsGroup">
                <span className='HomeSummaryBoxDetailsGroupSpan'>
                  groups : {currentUser?.createExpenseGroup?.length}
                </span>
                <span className='HomeSummaryBoxDetailsGroupSpan'>
                  Expense : {currentUser?.createExpenseInfo?.length}
                </span>
                <span className='HomeSummaryBoxDetailsGroupSpan'>
                invited users : {currentUser?.inviteAcceptedUsers?.length}
                </span>
            </div>
          </div>
        </div>
        <div className="HomeInvitation">
          <div className="HomeInvitationBox">
            <div className="InviteRequestWrapper">
              <div className="HomeSummaryTitle">
                <PersonAdd className='HomeSummaryIcon'/>
                Your expense track
              </div>
              <span className={currentUser?.recived +currentUser?.urShare != currentUser?.contributed ? 'HomeAmountSpent':'HomeAmountReceived'}>{currentUser?.recived +currentUser?.urShare != currentUser?.contributed ? "status : pending" : "status : AllSettled"}</span>
              <span className={currentUser?.recived +currentUser?.urShare != currentUser?.contributed ? 'HomeAmountSpent':'HomeAmountReceived'}>{currentUser?.recived +currentUser?.urShare != currentUser?.contributed ? `pending: ${currentUser?.contributed - currentUser?.urShare - currentUser?.recived}rs` : "pending : 0"}</span>
            </div>
            <div className="HomeSummaryBoxDetailsGroup">
                <span className='HomeAmountSpent'>
                  you contributed : {currentUser?.contributed}
                </span>
                <span className='HomeAmountReceived'>
                  received back : {currentUser?.recived}
                </span>
                <span className='HomeAmountReceived'>
                  your share : {currentUser?.urShare}
                </span>
            </div>
          </div>
        </div>
      </div>
      <div className="favWrapper">
          <div className="favListSide">
            <h1 className='favListTitle'>Invited users</h1>
            {!user || user?.length == 0 ?
            <div className="favListDialogueContainer">
               start adding fav user
               <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
               <button className='favListDialogueButton'>Add Fav user</button>
               </Link>
            </div>
            : <ul className='invitedUsersList'>
                {user?.map((user)=>(
                  <li>
                    <InvitedUsers className='HomeListValue' user={user}/>
                  </li>
                ))}
               </ul>
             }
          </div>
          <div className="favListWrapper">
          <div className="favList first">
          <h1 className='favListTitle'>Group</h1>
            {group?.length==0 ? 
              <Link to="/expenseGroup" style={{textDecoration:'none',color:'inherit'}}>
              <div className="favListDialogueContainer">
                 Create expense group
                 <button className='favListDialogueButton'>Create expense group</button>
              </div>
              </Link>
            :<ul className='favListUl'>
              {group?.map((item)=>(
                <li>
                <ExpenseDetails group={item}/>
                </li>
              ))
              }
            </ul>}
          </div>
          <div className="favList second">
          <h1 className='favListTitle'>expense</h1>
            {group?.length==0 ? 
              <Link to="/expenseGroup" style={{textDecoration:'none',color:'inherit'}}>
              <div className="favListDialogueContainer">
                 Create expense group
                 <button className='favListDialogueButton'>Create expense group</button>
              </div>
              </Link>
            :<ul className='favListUl'>
              {expenseInfo?.map((item)=>(
                <li>
                <ExpenseInfoSt expenseInfo={item}/>
                </li>
              ))
              }
            </ul>}
          </div>
          </div>

      </div>

    </div>
  )
}
