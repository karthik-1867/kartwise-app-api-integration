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
import { usersFetchStart, usersFetchSuccess, usersUpdateRemovedUser } from '../../redux/allUsersSlice';
import HomeLoadingComponent from '../../components/homeLoaderComponent/HomeLoadingComponent';
import { io } from "socket.io-client";

export default function Home({search}) {
  const dispatch = useDispatch();
  const [requestType,selectRequestType] = useState("pending");
  const [dialogue,setDialogue] = useState(false);
  const loggedInUser = useSelector((state)=>state.user.user)
  const [pending,setPending] = useState();
  const [loading,setLoading] = useState(false);

  const [allUser,setAllUsers] = useState([]);
  const [inviteRequest,setInviteRequest] = useState([]);
  const [inviteAcceptedUser,setInviteAcceptedUser] = useState([]);
  const [incomingRequest,setIncomingRequest] = useState([]);
  const [errorContainer,setErrorContainer] = useState("");
  console.log("allUser",JSON.stringify(allUser))
  console.log("home search",search)

  console.log("inviteRequest user",inviteRequest)
  console.log("incoming request",incomingRequest)
  console.log("invited accepy",inviteAcceptedUser)

  const inviteUser = async(user) => {
    console.log("addUser called");
    console.log(user);
    setErrorContainer("")
    try{
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

  const removedendingUser = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${user}`,{withCredentials:true})

  setInviteRequest((i)=>i.filter((id)=>id!=user));
  setAllUsers((i)=>[...i,removedendingUser.data])
}

const acceptIncomingRequest = async(user)=>{
  const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/acceptInvite/${user}`,{},{withCredentials:true});
  setIncomingRequest((i)=>i.filter((id)=>id!=user));
  setInviteAcceptedUser((i)=>[...i,user]);

  console.log("here is updated user",inviteAcceptedUser)

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
  // dispatch(loginStart())
  // dispatch(loginSuccess(currentUserData.data))

}

const fetchUser =async()=>{
  console.log(process.env.REACT_APP_URL);
  try{
    setLoading(true)
    setInviteRequest([]);
    setIncomingRequest([]);
    setInviteAcceptedUser([]);
    setInviteRequest([]);

    const deptGroup = await axios.get(`${process.env.REACT_APP_URL}/expense/pendingAmount`,{withCredentials:true})
    console.log("jsdjas",deptGroup.data);
    const pendingAmnt = deptGroup.data.map((i)=>i.expense-i.paidBack).reduce((i,c)=>(i+c),0);
    console.log("pendsad",pendingAmnt)
    setPending(pendingAmnt)

    const users = await axios.get(`${process.env.REACT_APP_URL}/user/getAllUser`,{withCredentials:true})
    const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${loggedInUser._id}`,{withCredentials:true})
    console.log("global ",users.data)
    dispatch(loginStart())
    dispatch(loginSuccess(getCurrentLoggedInUpdate.data))

    dispatch(usersFetchStart());
    dispatch(usersFetchSuccess(getCurrentLoggedInUpdate.data.inviteAcceptedUsers))
    setAllUsers(users.data)
    setInviteRequest([... getCurrentLoggedInUpdate.data.PendingInviteRequest])
    setIncomingRequest([...getCurrentLoggedInUpdate.data.inviteRequest])
    setInviteAcceptedUser([...getCurrentLoggedInUpdate.data.inviteAcceptedUsers])
    // setInviteRequest(user.data.PendingInviteRequest)
    setLoading(false)
  }catch(e){
    console.log("error"+e.message)
  }
}

useEffect(()=>{
  const socket = io(`${process.env.REACT_APP_URL}`, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected", socket.id);
  });



  socket.on("expenseUpdated", () => {
    console.log("Expense update received");
    fetchUser();
  });

    return () => {
      socket.disconnect();
    };
},[])


useEffect(()=>{
   console.log("seadteh",search)


   const searchRes = async()=>{
    if(search)
    {
     setLoading(true)
     const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/searchUser`,{search},{withCredentials:true});
     console.log("searcged data",currentUserData)
     const filterUserData = currentUserData.data.filter((i)=>allUser.some((u)=>i._id==u._id))

     if(filterUserData.length > 0){
       setAllUsers(filterUserData)
     }else{
       setAllUsers([])
     }
     const ids = currentUserData.data.map((i)=>i._id)
     const filterId = ids.filter((id)=>inviteAcceptedUser.includes(id))

     if(filterId.length>0){
       setInviteAcceptedUser(filterId)
     }else{
      setInviteAcceptedUser([])
     }
     setLoading(false)
    }else{
      setLoading(true)
      setAllUsers([])
      fetchUser()
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
    <div className='HomeContainer'>
      <div className="HomeBar">
        <div className="HomeSummary">
          <div className="HomeSummaryBoxes">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
              <div className="HomeSummaryTitle">
                <CurrencyRupee className='HomeSummaryIcon'/>
                Group Expense summary
              </div>
              <span className={pending>0 ? "HomeAmountSpent" : "HomeAmountReceived"} style={{fontWeight:"bold"}}>
                 payment pending : {pending}rs
              </span>
            </div>
              <div className="HomeSummaryBoxDetailsGroup">
                <span className="HomeAmountSpent">
                  expense : {loggedInUser?.expenditure}rs
                </span>
                <span className='HomeAmountReceived'>
                  recovered : {loggedInUser?.recoveredExpenditure}rs
                </span>
                <span className='HomeAmountReceived'>
                 You paid : {loggedInUser?.paidBack}rs
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
                  groups : {loggedInUser?.createExpenseGroup?.length}
                </span>
                <span className='HomeSummaryBoxDetailsGroupSpan'>
                  Expense : {loggedInUser?.createExpenseInfo?.length}
                </span>
                <span className='HomeSummaryBoxDetailsGroupSpan'>
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
                Your expense track
              </div>
              <div style={{display:"flex",gap:"5px",justifyContent:"space-evenly",flexWrap:"wrap",fontWeight:"bold"}}>
                <span className={loggedInUser?.recived +loggedInUser?.urShare != loggedInUser?.contributed ? 'HomeAmountSpent':'HomeAmountReceived'}>{loggedInUser?.recived +loggedInUser?.urShare != loggedInUser?.contributed ? "status : pending" : "status : AllSettled"}</span>
                <span className={loggedInUser?.recived +loggedInUser?.urShare != loggedInUser?.contributed ? 'HomeAmountSpent':'HomeAmountReceived'}>{loggedInUser?.recived +loggedInUser?.urShare != loggedInUser?.contributed ? `pending: ${loggedInUser?.contributed - loggedInUser?.urShare - loggedInUser?.recived}rs` : "pending : 0"}</span>
              </div>
            </div>
            <div className="HomeSummaryBoxDetailsGroup">
                <span className='HomeAmountSpent'>
                  you contributed : {loggedInUser?.contributed}
                </span>
                <span className='HomeAmountReceived'>
                  received back : {loggedInUser?.recived}
                </span>
                <span className='HomeAmountReceived'>
                  your share : {loggedInUser?.urShare}
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
            { (allUser.length>0) ? allUser?.map((user)=>(
              <li>
              <User userData={user} key={user.id} addUser={inviteUser} profile='true' className='HomeListValue'/>
              </li>
            )) :
            <>
            {loading  ?
            Array.from({ length: 20 }, () => 0).map(()=>(
              <li>
                <HomeLoadingComponent className='HomeListValue'/>
              </li>
            )) :
            <div className='HomeAllUserDialogueContainer' style={{width:"100%",boxSizing:"border-box"}}>
            <span className='HomeAllUserDialogueContainerText'>
              no result
             </span>
            </div>
            }
            </>
            }
          </ul>

         </div>
         {
           loading &&

           <div className="HomeAllUsers preview">
          <h1>Invited User</h1>
          <ul className='HomeList'>
          { Array.from({ length: 20 }, () => 0).map(()=>(
            <li>
              <HomeLoadingComponent className='HomeListValue'/>
            </li>
          ))
           }
          </ul>
          </div>

         }
         {inviteAcceptedUser?.length == 0  ?

             <>
             {!loading && <div className={inviteAcceptedUser?.length == 0 ? 'HomeAllUserDialogueContainer' : 'HomeAllUserDialogueContainer added'}>
              <span className='HomeAllUserDialogueContainerText'>
              {(inviteAcceptedUser?.length == 0 && !search) || !inviteAcceptedUser  ? 'Waiting for your friend approval request' : 'No result'}
              </span>
              </div>}
             </>
         :

          <div className="HomeAllUsers preview">
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

          </div>


         }
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
            loading ? (
             <ul className='InvitependingList'>
             { Array.from({ length: 20 }, () => 0).map(()=>(
               <li>
                 <HomeLoadingComponent className='HomeListValue'/>
               </li>
             ))
              }
             </ul>
             ):
            (!loading && <div className='HomeAllUserDialogueContainerForPendingRequest'>
            <span className='HomeAllUserDialogueContainerForPendingRequestText'>
              start sending invites.
            </span>
            </div>)
         }
        </div> :
        <div className="InviteDetails">
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
          (<div className='HomeAllUserDialogueContainerForPendingRequest'>
          <span className='HomeAllUserDialogueContainerForPendingRequestText'>
            'No incoming request'
          </span>
          </div>)
        }
        </div>

        }
      </div>
      </div>
      </div>
    </div>
  )
}
