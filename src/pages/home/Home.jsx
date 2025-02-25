import React, { useState } from 'react'
import "../home/home.css";
import User from '../../components/user/User';
import "../../scrollbar.css";
import { Users } from '../../dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess } from '../../redux/userSlice';
import GroupIcon from '@mui/icons-material/Group';
import { CurrencyRupee, Group, Groups2, Money, PersonAdd } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Select } from '@mui/material';

export default function Home() {

  console.log("dummy")
  const dispatch = useDispatch();
  const [requestType,selectRequestType] = useState("pending");
  const favUser = useSelector((state)=>state.user.user);
  const [dialogue,setDialogue] = useState(false);

  const [users,setUsers] = useState(Users)
  const [addFavUser,setAddFavUser] = useState([])
  // console.log(users)
  console.log("add fav user")
  console.log(addFavUser)

  const addUser = (user) => {
    console.log("addUser called");
    console.log(user?.id);
    //includes doesnt work in arrays use some
    // console.log(addFavUser.includes(user?.id) )
    if(addFavUser?.some((item)=>user?.id==item.id) !== true && favUser?.some((item)=>user?.id==item.id) !== true)
    { 
      setAddFavUser([...addFavUser,user]);
      setDialogue(false)
    }
    else{
      setDialogue(true)
    }
    // console.log("addUser")
    // console.log(users.length)
    // const newUser = {
    //     id: users.length + 1,
    //     profilePicture: "assets/person/new.jpeg",
    //     username: `User ${users.length + 1}`,
    // };

    // // const arr = [... users, newUser]
    // // console.log(typeof(arr))
    // // console.log(arr);

    // const arr = [... users, newUser]
    // console.log(typeof(arr))
    // console.log(arr);

    // // const arr = users?.concat(newUser);
    // // console.log(arr)

    // setUsers([...users, newUser]); // Add new user to state
};


const deleteUser = (id) => {
  console.log("delete user")
  console.log(id)
  
  setAddFavUser(addFavUser.filter(user => user.id !== id));
};


const saveFavUser = () =>{

  const favSubmitUser = favUser ? [...favUser,...addFavUser] : [...addFavUser]
   setAddFavUser([]);
  setDialogue(false)
   dispatch(loginStart())
   dispatch(loginSuccess(favSubmitUser));
}



  return (
    <div className='HomeContainer'>
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
      <div className="HomeWrapperContainer">
      <div className="HomeWrapper">      
         <div className="HomeAllUsers">
          <h1>Global users</h1>
          {dialogue && <span className='HomeListPopUp'>Already exist</span>}
          <ul className='HomeList'>
            {users?.map((user)=>(
              <li>
              <User user={'karthik'} userData={user} key={user.id} addUser={addUser} profile='true' className='HomeListValue'/>
              </li>
            ))
            }
          </ul>
        
         </div>
         {addFavUser?.length == 0  ?
         
         <div className={favUser?.length == 0 ? 'HomeAllUserDialogueContainer' : 'HomeAllUserDialogueContainer added'}>
            <span className='HomeAllUserDialogueContainerText'>
              {favUser?.length == 0 || !favUser ? 'start adding users from Global users' : 'U have added fav user u can start creating groups. if you want to add few more you can continue the choosing users from Global users'}
              {favUser?.length > 0 &&  
              <>
              <span>or</span>
              <span>click link below for creating group</span>
              <Link to="/expenseGroup" style={{textDecoration:'none',color:'inherit'}}>
              <button className='HomeAllUserDialogueContainerTextButton'>Create group</button>
              </Link>
              </>
              }
              </span>
         </div>
         : <div className="HomeAllUsers preview">
          <h1>Invited User</h1>
          <ul className='HomeList'>
            {addFavUser?.map((user)=>(
            <li>
            <User user={'karthik'} className='HomeListValue' profile='false' addFavUser={user} key={addFavUser.id} deleteUser={deleteUser}/>
            </li>
            ))
            }
          </ul>
          <button onClick={saveFavUser} className='HomeButton'>Submit</button>
         </div>}
      </div>
      <div className="InviteWrapper">
        <div className="ChooseInviteView">
          <h1>select request type</h1>
          <div className="chooseInviteViewWrapper">
            <div className="ChooseInviteViewDetails">
              <button onClick={()=>selectRequestType("pending")}>Pending request</button>
              <span>count : 3</span>
            </div>
            <div className="ChooseInviteViewDetails">
              <button onClick={()=>selectRequestType("incoming")}>Incoming request</button>
              <span>count : 0</span>
            </div>
          </div>
        </div>
        {requestType == "pending" ?
          <div className="InviteDetails">
          <h1>Pending request</h1>
          <ul className='InvitependingList'>
          {users?.map((user)=>(
          <li>
            <User user={'karthik'} userData={user} key={user.id} addUser={addUser} profile='true' className='HomeListValue'/>
            </li>
          ))}
          </ul>
        </div> : <div className="InviteDetails">
          <h1>Incoming request</h1>
          <ul className='InvitependingList'>
          {users?.map((user)=>(
          <li>
            <User user={'karthik'} userData={user} key={user.id} addUser={addUser} profile='true' className='HomeListValue'/>
            </li>
          ))}
          </ul>
        </div>

        }
      </div>
      </div>
    </div>
  )
}
