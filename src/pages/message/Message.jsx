import React from 'react'
import '../message/message.css'
import { Avatar } from '@mui/material'
import { AttachFile } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'


export default function Message() {
    const group = useSelector((state)=>state.createExpenseGroup.createExpenseGroup)
  return (
    <div className='MessageContainer'>
      <div className="MessageWrapperAndFilters">
        <div className="MessageWrapperAndHeader">
            <h1>Notification</h1>
            <div className="MessageWrapper">

            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. second</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            <div className="Message recived">
                <div className="MessageDetails">
                    <div className="MessageUserName">
                        <Avatar className='MessageAvatar'/>
                        karthik
                    </div>
                    <span className="MessageTimeStamp">10:30 am</span>
                </div>
                <hr/>
                <span className="MessageContent">Hi how are you. ad wde w dewqd wq dw d wadw dewqsd ewqe qwe qwd eqwed qwe qwe qwd wd eqwed wqweq eqwed</span>
            </div>
            </div>
        </div>  
      <div className="MessageFilter">
        <h1>Filters</h1>
        <div className="MessageHighPriorty">
            Sort by high priority
        </div>
        <div className="MessageLowPriority">
           Sort by low priority
        </div>
        
      </div>
      </div>
      <div className="InviteList">
        <h1>Invite List</h1>
        <ul className='favListUl'>
            {group?.map((item)=>(
            <li>
            <ExpenseDetails groupDetail={item}/>
            </li>
            ))
            }
        </ul>

      </div>
    </div>
  )
}
