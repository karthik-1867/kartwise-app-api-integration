import React, { useState } from 'react'
import '../createExpenseSheet/createExpenseSheet.css'
import FavUser from '../../components/favUser/FavUser'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import CreateExpenseAddUser from '../../components/createExpenseAddUser/CreateExpenseAddUser'
import { useDispatch, useSelector } from 'react-redux'
import ExpenseGroups from '../../components/expenseGroups/ExpenseGroups'
import CreateExpenseInputs from '../../components/createExpenseInputs/CreateExpenseInputs'
import { expenseStart, expenseSuccess } from '../../redux/createdExpenseGroup'
import { Link } from 'react-router-dom'
export default function CreateExpense() {

  const group = useSelector((state)=>state.createExpenseGroup.createExpenseGroup)
  const dispatch = useDispatch()

  const [selectedPerson,setSelectedPerson] = useState([]);
  const [inputs,setInputs] = useState({ owner: "",users:[],groupName:"",uploadImage:""});

  console.log("create inputs",JSON.stringify(inputs))

  const selectedUser = (group) =>{
     console.log("group",JSON.stringify(group.members))
     setSelectedPerson([... group.members])
  }

  const handlerInputs = (e) =>{
     setInputs((prev)=>{
       return {...prev, [e.target.name]:e.target.value}
     })
  }

  const handleUserInputs = (user) => {
     setInputs((prev)=>{
      //problem is its creating new user every time we want too update it
       //return {...prev, users:[...prev?.users, user]}
       return {...prev, users: prev.users.some((u)=>u.id==user.id) ? prev.users.map((item)=>item.id==user.id ? {...item,spent:user.spent} : item) : [...prev.users,user]}
     })
  }

  const handleSubmit = () => {

    console.log(typeof inputs.users)
    console.log("output",JSON.stringify(inputs?.users.filter((item)=>item.username!=inputs.owner)))
     const totalTobePaid = inputs?.users.filter((item)=>item.username!=inputs.owner).reduce((acc,curr)=>(acc+Number(curr?.spent)), 0);
     console.log("totalTobePaid",totalTobePaid)

     const finalInputs = {...inputs,paid:totalTobePaid,ownerReceived:0,amountReturnedUser:[]};
     console.log("finalInputs",JSON.stringify(finalInputs))
    dispatch(expenseStart())
    dispatch(expenseSuccess(finalInputs))
    setInputs({owner: "",users:[],groupName:"",uploadImage:""})
    setSelectedPerson([])
    }

  return (
    <div className='CreateExpenseSheetContainer'>
      <div className="CreateExpenseSheetWrapper">
         <div className="CreateExpenseSheetLists">
          <div className="ExpenseListWrapper">
            <div className="CreateExpenseSheetList addition1">
              <h1 className='CreateExpenseSheetTitle'>Choose group</h1>
              {group?.length==0? 
              <div className="CreateExpenseDialogueContainer">
                Add fav user to start creating groups
                <Link to="/expenseGroup" style={{textDecoration:'none',color:'inherit'}}>
                <button className="createExpenseDialogueButton">Create group</button>
                </Link>
              </div>
              :
              <ul className='CreateExpenseSheetListUl ad1'>
                {
                group?.map((item)=>(
                    <li >
                    <ExpenseGroups  group={item} key={item.id} selectedUser={selectedUser}/>
                    </li>
                ))  
                }
              </ul>}
            </div>

            <div className="CreateExpenseSheetList addition">
              <div className="CreateExpenseSheetInputWrapper">
                  <h1 className='CreateExpenseSheetTitle'>Create expenses</h1>
                  <h4 className='CreateExpenseSheetName'>Title</h4>
                  <input name='groupName' type="text" placeholder='Enter group name' value={inputs?.groupName} className='CreateExpenseSheetListInput' onChange={(e)=>handlerInputs(e)}/>
                  <h4>Upload image</h4>
                  <input name='uploadImage' type="text" placeholder='Upload image'  value={inputs?.uploadImage} className='CreateExpenseSheetListInput' onChange={(e)=>handlerInputs(e)}/>
                  <h4>Paid by</h4>
                  <select name='owner' className='CreateExpenseSheetListInput select' value={inputs.owner} onChange={(e)=>handlerInputs(e)}>
                    { selectedPerson?.map((item)=>(
                      <option value={item?.username}>{item?.username}</option>
                    ))
                    }
                  </select>
                  <div className="CreateExpenseSheetUserAndExpenseContainer">
                    {selectedPerson.length>0 ? selectedPerson?.map((item)=>(
                         <CreateExpenseInputs users={item} handleUserInputs={handleUserInputs}/>
                      )) :
                      <div className="dialogueContainer1">
                          select group
                    </div>
                    }
                  </div>

              </div>
          
              <button onClick={handleSubmit} className='CreateExpenseSheetSubmit'>Submit</button>
            </div>
          </div>
         </div>
      </div>
    </div>
  )
}
