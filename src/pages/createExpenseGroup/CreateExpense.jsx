import React, { useState } from 'react'
import '../createExpenseGroup/createExpense.css'
import FavUser from '../../components/favUser/FavUser'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import CreateExpenseAddUser from '../../components/createExpenseAddUser/CreateExpenseAddUser'
import { useDispatch, useSelector } from 'react-redux'
import { expenseGroupStart, expenseGroupSuccess } from '../../redux/createExpenseUser'
import { Link } from 'react-router-dom'


export default function CreateExpense() {
 
  const favUser = useSelector((state)=>state.user.user);
  const [selectUser,setSelectedUser] = useState([]);
  const [inputs,setInputs] = useState({})
  const dispatch = useDispatch();
  const createGroup = useSelector((state)=>state?.createExpenseGroup.createExpenseGroup)

  console.log("inputs",JSON.stringify(inputs));

  const addCreateExpenseUser = (user) => {
    // const paymentInfos = {...user,paymentToBeDone:0,lentByOwner:0,paymentTobeReceived:0,isPayer:false,amountSpent:0,amountReceived:0} 
    if(!selectUser.some((item)=>item.id==user.id)){
     setSelectedUser([...selectUser,user]);
    }
    setInputs((prev)=>{
      return {...prev, members:[...selectUser,user]}
  })
  }

  const removeExpenseUser = (id) => {
    const selectedUsers = selectUser.filter((item)=>item.id != id)
    setSelectedUser(selectedUsers)
    setInputs((prev)=>{
      return {...prev, members:selectedUsers}
  })
  }

  const inputSet = (e) => {
     setInputs((prev)=>{
      return {...prev, [e.target.name]:e.target.value}
     })
  }

  const submitInputs = () =>{

    dispatch(expenseGroupStart())
    // dispatch(expenseGroupSuccess({... inputs, spent:0,recived:0}));
    dispatch(expenseGroupSuccess({... inputs, spent:0,recived:0,id:createGroup.length+1}));

    setInputs((prev)=>{
      return {...prev, title:"",uploadImage:""}
    })
    setSelectedUser([]);
  }



  return (
    <div className='createExpenseGroupContainer'>
      <div className="ExpenseGroupWrapper">
         <div className="ExpenseGroupLists">
          <div className="ExpenseListWrapper">
            <div className="ExpenseGroupList addition">
              <h1 className='ExpenseGroupTitle'>Bookmarked users view</h1>
              {!favUser || favUser?.length == 0 ? 
              <div className="ExpenseContainerDialogue">
                start adding fav user to create expense group and expense 
                <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
                <button className='ExpenseContainerDialogueButton'>Add Fav user</button>
                </Link>
              </div>
              :
              <ul className='ExpenseGroupListUl ad1'>
                {favUser?.map((item)=>(
                <li >
                <CreateExpenseAddUser user={item} addUser={addCreateExpenseUser} key={item.id} isSelectedUser='false'/>
                </li>
                ))
                }
              </ul>}
            </div>

            <div className="ExpenseGroupList addition">
              <div className="ExpenseGroupListContainer">

                <h1 className='ExpenseGroupTitle'>Create expense Group</h1>
                <h4 className='ExpenseGroupName'>Title</h4>
                <input type="text" placeholder='Enter group name' value={inputs?.title} name='title' onChange={(e)=>inputSet(e)} className='ExpenseGroupListInput'/>
                <h4>Upload image</h4>
                <input type="text" placeholder='Upload image' value={inputs?.uploadImage} name='uploadImage' onChange={(e)=>inputSet(e)} className='ExpenseGroupListInput'/>
              </div>
            
                { selectUser?.length == 0 ? 
                    (<div className="dialogueContainer">
                                Add members from left list
                    </div>)
                    :

                    (<ul className='ExpenseGroupListUl'>

                      {selectUser?.map((item)=>(
                        <li className='extra'>
                        <CreateExpenseAddUser selectedUser={item} key={item.id} isSelectedUser='true' removeUser={removeExpenseUser}/>
                        </li>
                      ))}
                    </ul>)
                }

              <button onClick={submitInputs} className='ExpenseGroupSubmit'>Submit</button>
            </div>
          </div>
         </div>
      </div>
    </div>
  )
}
