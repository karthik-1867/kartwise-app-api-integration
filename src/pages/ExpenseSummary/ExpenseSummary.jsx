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

export default function ExpenseSummary() {

    // const expenseGroupSummary = useSelector((state)=>state.expenseGroupInfo.expenseGroupInfo)
    // const [selectedGroup,setSelectedGroup] = useState([]);
    const [id,setId] = useState();
    const [errorContainer,setErrorContainer] = useState("");
    const currentUser = useSelector((state)=>state.user.user)
    const expenseGroupSummary = currentUser.createExpenseInfo
    console.log("sidashl",expenseGroupSummary);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState();
    const [selectedGroup,setSelectedGroup] = useState([]);

    const {expensedata,groupName,status,expenseId} = useExpenseDetailsFetcher(id);
    // const selectedGroup = !expensedata ? [] : expensedata;
    console.log("ur check",JSON.stringify(selectedGroup))
 
    console.log("expenseGropsumary",JSON.stringify(expenseGroupSummary))

    const handleSelectedUser = async(userDetail) =>{
        setErrorContainer("")
        console.log("idsa",id,userDetail)
        setId(userDetail)
        
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
           {loading && <div className="expenseGroupExpenditureSummary">
                       <div className="loadingTest"></div>
                       {Array.from({ length: 5 }, () => 0).map(()=>(
                         
                           <ExpenditureLoader/>
                         
                       ))}
                       </div>
                       
           }
           {!loading && selectedGroup?.length != 0 && <div className="expenseGroupExpenditureSummary">
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
