import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import PendingInviteRequest from '../../components/pemdingInvite/PendingInviteRequest';
import IncomingInviteRequest from '../../components/incomingInvite/IncomingInviteRequest';
import InvitedUsers from '../../components/invitedUsers/InvitedUsers';

export default function Home() {
  const dispatch = useDispatch();
  const [requestType,selectRequestType] = useState("pending");
  const favUser = useSelector((state)=>state.user.user);
  const [dialogue,setDialogue] = useState(false);
  const loggedInUser = useSelector((state)=>state.user.user)

  //to be removed
  const [users,setUsers] = useState(Users);
  
  const [allUser,setAllUsers] = useState([]);
  const [inviteRequest,setInviteRequest] = useState([]);
  const [inviteAcceptedUser,setInviteAcceptedUser] = useState([]);
  const [incomingRequest,setIncomingRequest] = useState([]);
  const [errorContainer,setErrorContainer] = useState("");
  console.log("allUser",JSON.stringify(allUser))

  
  
  const [addFavUser,setAddFavUser] = useState([])
  // console.log(users)

  console.log("inviteRequest user",inviteRequest)
  console.log("incoming request",incomingRequest)
  console.log("invited accepy",inviteAcceptedUser)

  const inviteUser = async(user) => {
    console.log("addUser called");
    console.log(user);
    setErrorContainer("")
    try{

      await axios.get(`${process.env.REACT_APP_URL}/user/getAllUser`,{withCredentials:true})
      await axios.post(`${process.env.REACT_APP_URL}/user/inviteRequest/${user._id}`,{},{withCredentials:true})
      if(!inviteRequest.includes(user._id)) setInviteRequest((i)=>[...i, user._id]);
      setAllUsers((alluser)=>alluser.filter((i)=>i._id != user._id))
    }catch(e){
      console.log(e.response)
      setErrorContainer(e.response.data.message)
    }
};

const removePendingUser = async(user) =>{
  const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/rejectPendingInvite/${user}`,{},{withCredentials:true})
  dispatch(loginStart());
  const removedendingUser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})
  dispatch(loginSuccess(currentUserData.data));
  setInviteRequest((i)=>i.filter((id)=>id!=user));
  setAllUsers((i)=>[...i,removedendingUser.data])
}

const acceptIncomingRequest = async(user)=>{
  const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/acceptInvite/${user}`,{},{withCredentials:true});
  setIncomingRequest((i)=>i.filter((id)=>id!=user));
  setInviteAcceptedUser((i)=>[...inviteAcceptedUser,user]);
  dispatch(loginStart());
  dispatch(loginSuccess(currentUserData.data));
}

const rejectIncomingRequest = async(user)=>{
  const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/removeInviteRequest/${user}`,{},{withCredentials:true});
  const rejectePendingUser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})
  setIncomingRequest((i)=>i.filter((id)=>id!=user));
  setAllUsers((i)=>[...i,rejectePendingUser.data])
}

const rejectInvitedUser = async(user) => {
  const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/removeInvitedUser/${user}`,{},{withCredentials:true});
  setInviteAcceptedUser((i)=>i.filter((id)=>id!=user))
  const rejectInvitedUser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})
  setAllUsers((i)=>[...i,rejectInvitedUser.data])
  dispatch(loginStart())
  dispatch(loginSuccess(currentUserData.data))
}


useEffect(()=>{
  const fetchUser =async()=>{
    console.log(process.env.REACT_APP_URL);
    try{
      setInviteRequest([]);
      setIncomingRequest([]);
      setInviteAcceptedUser([]);
      setInviteRequest([]);
      const users = await axios.get(`${process.env.REACT_APP_URL}/user/getAllUser`,{withCredentials:true})
      const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${loggedInUser._id}`,{withCredentials:true})
      console.log("global ",users.data)
      dispatch(loginStart)
      dispatch(loginSuccess(getCurrentLoggedInUpdate.data))


      setAllUsers(users.data)
      setInviteRequest([...inviteRequest, ... getCurrentLoggedInUpdate.data.PendingInviteRequest])
      setIncomingRequest([...incomingRequest,...getCurrentLoggedInUpdate.data.inviteRequest])
      setInviteAcceptedUser([...inviteAcceptedUser, ...getCurrentLoggedInUpdate.data.inviteAcceptedUsers])
      // setInviteRequest(user.data.PendingInviteRequest)
    }catch(e){
      console.log("error"+e.message)
    }
  }

  fetchUser();
},[])


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
                  groups : {loggedInUser?.createExpenseGroup?.length}
                </span>
                <span>
                  Expense : {loggedInUser?.createExpenseInfo?.length}
                </span>
                <span>
                invited users : {loggedInUser?.inviteAcceptedUsers?.length}
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
                  pending request : {inviteRequest.length}
                </span>
                <span>
                  incoming requests : {incomingRequest.length}
                </span>
            </div>
          </div>
        </div>
      </div>
      <div className="HomeWrapperContainer">
      {errorContainer !="" && <div className="errorContainer">
        {errorContainer}
      </div>}
      <div className="NormalContainer">
      <div className="HomeWrapper">      
         <div className="HomeAllUsers">
          <h1>Global users</h1>
          {dialogue && <span className='HomeListPopUp'>Already exist</span>}
          <ul className='HomeList'>
            {allUser?.map((user)=>(
              <li>
              <User userData={user} key={user.id} addUser={inviteUser} profile='true' className='HomeListValue'/>
              </li>
            ))
            }
          </ul>
        
         </div>
         {inviteAcceptedUser?.length == 0  ?
         
         <div className={inviteAcceptedUser?.length == 0 ? 'HomeAllUserDialogueContainer' : 'HomeAllUserDialogueContainer added'}>
            <span className='HomeAllUserDialogueContainerText'>
              {inviteAcceptedUser?.length == 0 || !inviteAcceptedUser ? 'Waiting for your friend approval request' : 'U have added fav user u can start creating groups. if you want to add few more you can continue the choosing users from Global users'}
            </span>
         </div>
         : <div className="HomeAllUsers preview">
          <h1>Invited User</h1>
          <Link to="/expenseGroup" style={{textDecoration:'none',color:'inherit'}}>
          <button  className='HomeButton'>Create group</button>
          </Link>
          <ul className='HomeList'>
            {inviteAcceptedUser?.map((user)=>(
            <li>
            <InvitedUsers user={user} className='HomeListValue'  key={user} rejectInvitedUser={rejectInvitedUser}/>
            </li>
            ))
            }
          </ul>
          
         </div>}
      </div>
      <div className="InviteWrapper">
        <div className="ChooseInviteView">
          <h1>select request type</h1>
          <div className="chooseInviteViewWrapper">
            <div className="ChooseInviteViewDetails">
              <button onClick={()=>selectRequestType("pending")}>Pending request</button>
              <span>count : {inviteRequest.length}</span>
            </div>
            <div className="ChooseInviteViewDetails">
              <button onClick={()=>selectRequestType("incoming")}>Incoming request</button>
              <span>count : {incomingRequest.length}</span>
            </div>
          </div>
        </div>
        {requestType == "pending" ?
          <div className="InviteDetails">
          <h1>Pending request</h1>
          
          {
          inviteRequest.length!=0 ?
          <ul className='InvitependingList'>
          {inviteRequest?.map((user)=>( 
          <li>
            <PendingInviteRequest userData={user} key={user} removePendingUser={removePendingUser} className='HomeListValue'/>
            </li> 
            ))}
            </ul>
            :
            <div className='HomeAllUserDialogueContainerForPendingRequest'>
            <span className='HomeAllUserDialogueContainerForPendingRequestText'>
              'start sending invites.' 
            </span>
            </div>
         }
        </div> : <div className="InviteDetails">
          <h1>Incoming request</h1>
          { incomingRequest.length!=0 ?
            <ul className='InvitependingList'>
          {incomingRequest?.map((user)=>(
          <li>
            <IncomingInviteRequest userData={user} key={user.id} accept={acceptIncomingRequest} reject={rejectIncomingRequest} className='HomeListValue'/>
            </li>
          ))}
          </ul>
          :
          <div className='HomeAllUserDialogueContainerForPendingRequest'>
          <span className='HomeAllUserDialogueContainerForPendingRequestText'>
            'No incoming request' 
          </span>
          </div>
          }
        </div>

        }
      </div>
      </div>
      </div>
    </div>
  )
}
