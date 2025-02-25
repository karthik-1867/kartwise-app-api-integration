import React, { useState } from 'react'
import '../ExpenseSummary/expenseSummary.css'
import ExpenseCard from '../../components/expenseCard/ExpenseCard'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import ExpenditureInfo from '../../components/expenditureInfo/ExpenditureInfo'
import { Link } from 'react-router-dom'

export default function ExpenseSummary() {

    const expenseGroupSummary = useSelector((state)=>state.expenseGroupInfo.expenseGroupInfo)
    const [selectedGroup,setSelectedGroup] = useState([]);


    console.log("expenseGropsumary",JSON.stringify(expenseGroupSummary))

    const handleSelectedUser = (user) =>{
        console.log("indo",JSON.stringify(user));
        setSelectedGroup(user)
    }

  return (
    <div className='expenseSummaryContainer'>
        
        <div className="expenseSummaryWrapper">
           <div className="expenseSummaryLists">
            <h1>Choose Expense group</h1>
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
                        <ExpenseCard user={item} key={item.id} handleSelectedUser={handleSelectedUser} />
                    </li>
                ))
                }
            </ul>}
           </div>
           {selectedGroup.length != 0 && <div className="expenseGroupExpenditureSummary">
             <h4>{selectedGroup?.groupName}</h4>
             {
                selectedGroup?.users.map((item)=>(

                    <ExpenditureInfo individualRecord={item} key={item.id}/>
                ))
             }
           </div>}
        </div>
    </div>
  )
}
