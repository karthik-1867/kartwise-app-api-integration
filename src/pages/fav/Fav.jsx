import React, { useEffect, useState } from 'react'
import '../fav/fav.css'
import User from '../../components/user/User'
import FavUser from '../../components/inviteAcceptedUser/FavUser'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CurrencyRupee, Group, PersonAdd } from '@mui/icons-material'
import InvitedUsers from '../../components/invitedUsers/InvitedUsers'
import ExpenseInfoSt from '../../components/expenseInfoSt/ExpenseInfoSt'
import ExpenseDetailsLoader from '../../components/expenseDetailsloader/ExpenseDetailsLoader'
import ExpenseInfoStLoader from '../../components/expenseInfoStLoader/ExpenseInfoStLoader'

export default function Fav() {


   const currentUser = useSelector((state)=>state.user.user)
   const [user,setUser] = useState([]);
   const [group,setGroup] = useState([]);
   const [expenseInfo,setExpenseInfo] = useState([]);

  useEffect(()=>{
      setUser([...currentUser.inviteAcceptedUsers])
      setGroup([...currentUser.createExpenseGroup])
      setExpenseInfo([...currentUser.createExpenseInfo])
},[currentUser])


  return (
    <div className='favContainer'>
      <div className="HomeBar">
        <div className="HomeSummary">
          <div className="HomeSummaryBoxes">
            <div className="HomeSummaryTitle">
              <CurrencyRupee className='HomeSummaryIcon'/>
              Expense summary
            </div>
            <div className="HomeSummaryBoxDetails">
              <div className="HomeSummaryAmount">
                Spent :
                <span className='HomeAmountSpent'>50054 rs</span>
              </div>
              <div className="HomeSummaryAmount">
                  recived :
                  <span className='HomeAmountReceived'>50034 rs</span>            
                </div>
            </div>
          </div>
          <div className="HomeSummaryBoxes">
            <div className="HomeSummaryTitle">
              <Group className='HomeSummaryIcon'/>
              Total groups
            </div>
            <div className="HomeSummaryBoxDetailsGroup">
                <span>
                  groups : 4
                </span>
                <span>
                  Expense : 4
                </span>
                <span>
                fav users : 109
                </span>
            </div>
          </div>
        </div>
        <div className="HomeInvitation">
          <div className="HomeInvitationBox">
            <div className="InviteRequestWrapper">
              <div className="HomeSummaryTitle">
                <PersonAdd className='HomeSummaryIcon'/>
                Invite Request Notification
              </div>
             <button className='ExpandRequestButton'>More Info</button>
            </div>
            <div className="HomeSummaryBoxDetailsGroup">
                <span>
                  pending request : 4
                </span>
                <span>
                  incoming requests : 4
                </span>
            </div>
          </div>
        </div>
      </div>
      <div className="favWrapper">
          <div className="favListSide">
            <h1 className='favListTitle'>Bookmarked users view</h1>
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
          <h1 className='favListTitle'>Quick expense access</h1>
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
          <h1 className='favListTitle'>Quick expense access</h1>
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
