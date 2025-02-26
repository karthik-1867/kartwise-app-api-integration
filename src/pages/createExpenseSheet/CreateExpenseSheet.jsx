import React, { useState } from 'react'
import '../createExpenseSheet/createExpenseSheet.css'
import FavUser from '../../components/inviteAcceptedUser/FavUser'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import CreateExpenseAddUser from '../../components/createExpenseAddUser/CreateExpenseAddUser'
import { useDispatch, useSelector } from 'react-redux'
import ExpenseGroups from '../../components/expenseGroups/ExpenseGroups'
import CreateExpenseInputs from '../../components/createExpenseInputs/CreateExpenseInputs'
import { expenseStart, expenseSuccess } from '../../redux/createdExpenseGroup'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { loginStart, loginSuccess } from '../../redux/userSlice'
export default function CreateExpense() {

  // const group = useSelector((state)=>state.createExpenseGroup.createExpenseGroup)
  const currentUser = useSelector((state)=>state.user.user)
  const group = currentUser.createExpenseGroup
  console.log("greop",group)
  const dispatch = useDispatch()

  const [selectedPerson,setSelectedPerson] = useState([]);
  const [inputs,setInputs] = useState({ owner: "",users:[],groupName:"",uploadImage:"",expenseGroupId:""});

  console.log("create inputs",JSON.stringify(inputs))

  const selectedUser = async(group,id) =>{
    //  console.log("group",JSON.stringify(group.members))
    //  setSelectedPerson([... group.members])
    setInputs({owner: "",users:[],groupName:"",uploadImage:""})
    setSelectedPerson([])
    console.log(group);
  
    const userData = await axios.post(`${process.env.REACT_APP_URL}/expense/memberDetails`,{members:[...group]},{withCredentials:true})
    console.log(userData.data)
    setSelectedPerson([...userData.data])
    setInputs((prev)=>{
      return {... prev, owner:userData.data[0].name,expenseGroupId:id}
    })
  }

  const handlerInputs = (e) =>{
     console.log(e)
     setInputs((prev)=>{
       return {...prev, [e.target.name]:e.target.value}
     })
  }

  const handleUserInputs = (user) => {
    console.log("ur yser",user)
     setInputs((prev)=>{
      //problem is its creating new user every time we want too update it
       //return {...prev, users:[...prev?.users, user]}
       return {...prev, users: prev.users.some((u)=>u.id==user.id) ? prev.users.map((item)=>item.id==user.id ? {...item,expense:user.expense} : item) : [...prev.users,user]}
     })
  }

  const handleSubmit = async() => {

    const {owner,groupName,expenseGroupId,users,uploadImage} = inputs;
    try{
      await axios.post(`${process.env.REACT_APP_URL}/expense/createExpenseDetails`,{groupName,expenseGroupId,users,uploadImage,owner},{withCredentials:true})
      const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})
       dispatch(loginStart());
       dispatch(loginSuccess(getCurrentLoggedInUpdate.data));
     
      setInputs({owner: "",users:[],groupName:"",uploadImage:""})
      setSelectedPerson([])
    }catch(e){
      console.log(e)
    }
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
                      <option value={item?.name}>{item?.name}</option>
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
