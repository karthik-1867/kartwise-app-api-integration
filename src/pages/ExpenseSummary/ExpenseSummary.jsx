import React, { useEffect, useState } from 'react'
import '../ExpenseSummary/expenseSummary.css'
import ExpenseCard from '../../components/expenseCard/ExpenseCard'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ExpenditureInfo from '../../components/expenditureInfo/ExpenditureInfo'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useExpenseDetailsFetcher from '../../customHook/expenseDetailLogic'
import { loginStart, loginSuccess } from '../../redux/userSlice'
import ExpenseCardLoadingLoading from '../../components/expenseCardLoading/ExpenseCardLoading'
import ExpenditureLoader from '../../components/expenditureLoader/ExpenditureLoader'
import { io } from "socket.io-client";
export default function ExpenseSummary({search}) {

    // const expenseGroupSummary = useSelector((state)=>state.expenseGroupInfo.expenseGroupInfo)
    // const [selectedGroup,setSelectedGroup] = useState([]);
    const [id,setId] = useState();
    const [errorContainer,setErrorContainer] = useState("");
    const currentUser = useSelector((state)=>state.user.user)
    const [expenseGroupSummary,setExpenseGroupSummary] = useState([... currentUser.createExpenseInfo])

    console.log("sidashl",expenseGroupSummary);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState();
    const [mainloading,setMainLoading] = useState(true);
    const [selectedGroup,setSelectedGroup] = useState([]);

    const {expensedata,groupName,status,expenseId} = useExpenseDetailsFetcher(id);
    // const selectedGroup = !expensedata ? [] : expensedata;
    console.log("ur check",JSON.stringify(selectedGroup))

    console.log("expenseGropsumary",JSON.stringify(expenseGroupSummary))

    const handleSelectedUser = async(userDetail) =>{
        setErrorContainer("")
        console.log("idsa",id,userDetail)
        setId(userDetail)
        setSelectedGroup([])

        if(id!=userDetail) setLoading(true)

    }

    const handleError = (message) => {
        console.log("errorMessafe",message)
        setErrorContainer(message)
    }

    const handleExpenseDelete = async(id) => {
        try{
            if(id == expenseId) setId()
            console.log("deleting id",id)
            await axios.delete(`${process.env.REACT_APP_URL}/expense/deleteExpenseDetails/${id}`,{withCredentials:true})
            const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})
            dispatch(loginStart())
            console.log("sidashl",JSON.stringify(getCurrentLoggedInUpdate.data))
            dispatch(loginSuccess(getCurrentLoggedInUpdate.data))
        }catch(e){
           console.log(e)
        }


    }

    useEffect(()=>{
        console.log("in useEffect")
        console.log(expensedata)
        if(expensedata)
        {
            setSelectedGroup([...expensedata]);
        }else{
            setSelectedGroup([])
        }
        setLoading(false)
    },[expenseGroupSummary,expensedata])


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
                if(expenseGroupSummary.length==0) setMainLoading(true)
                  setLoading(true)
                if(currentUser.createExpenseInfo.length>0){
                  const userData = await axios.get(`${process.env.REACT_APP_URL}/expense/getExpenseDetails/${currentUser.createExpenseInfo[0]}`,{withCredentials:true})
                  setId(userData.data._id)
                }
                const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})
                dispatch(loginStart())
                dispatch(loginSuccess(getCurrentLoggedInUpdate.data))


                setExpenseGroupSummary([...currentUser.createExpenseInfo])
                setLoading(false)
                setMainLoading(false)
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


    useEffect(()=>{
       console.log("seadteh",search)
       const searchRes = async()=>{
        if(search)
        {
         const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/expense/searchExpenseInfo`,{search},{withCredentials:true});
         console.log("searcged data",currentUserData)
        //  const filterUserData = currentUserData.data.filter((i)=>allUser.some((u)=>i._id==u._id))
        const ids = currentUserData.data.map((i)=>i._id).filter((i)=>currentUser.createExpenseInfo.some((u)=>u==i))
        setExpenseGroupSummary([...ids])

        }else{
            setExpenseGroupSummary([...currentUser.createExpenseInfo])
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
    <div className='expenseSummaryContainer'>

        <div className="expenseSummaryWrapper">
           <div className="expenseSummaryLists">
            <h1>Choose Expense group</h1>
            {errorContainer!="" && <div className="ErrorContainer expenseSummary">
               {errorContainer}
         </div>}
            {expenseGroupSummary?.length == 0 || !expenseGroupSummary ?
            <div className="expenseSummaryDialogue">
                Add fav user and start creating expense groups
                <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
                <button className="expenseSummaryDialogueButton">
                    Add fav user
                </button>
                </Link>
            </div>
            :
            <ul className="expenseSummaryList">
                {expenseGroupSummary?.map((item)=>(
                    <li>
                        <ExpenseCard user={item} key={item.id} handleSelectedUser={handleSelectedUser} handleError={handleError} handleExpenseDelete={handleExpenseDelete}/>
                    </li>
                ))
                }
            </ul>}
           </div>
           {(expenseGroupSummary.length != 0 && selectedGroup.length == 0) && <div className="expenseGroupExpenditureSummary">
                       <div className="loadingTest"></div>
                       {Array.from({ length: 5 }, () => 0).map(()=>(

                           <ExpenditureLoader/>

                       ))}
                       </div>

           }
           { ( selectedGroup?.length != 0) && <div className="expenseGroupExpenditureSummary">
             <h4>{groupName}</h4>
             {
                selectedGroup?.map((item)=>(
                    <>
                    <ExpenditureInfo individualRecord={item} key={item.id}/>
                    </>
                ))
             }
           </div>}
        </div>
    </div>
  )
}
