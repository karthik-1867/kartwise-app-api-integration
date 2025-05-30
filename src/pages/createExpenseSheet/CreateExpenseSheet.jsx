import React, { useEffect, useState } from 'react'
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
import { retry } from '@reduxjs/toolkit/query'
import CreateExpenseInputLoading from '../../components/createExpenseInputLoading/CreateExpenseInputLoading'
import { FileUpload } from '@mui/icons-material'
export default function CreateExpense({search}) {

  // const group = useSelector((state)=>state.createExpenseGroup.createExpenseGroup)
  const currentUser = useSelector((state)=>state.user.user)

  const [group,setGroup] = useState([...currentUser.createExpenseGroup])
  console.log("greop",group)
  const dispatch = useDispatch()

  const [selectedPerson,setSelectedPerson] = useState([]);
  const [errorContainer,setErrorContainer] = useState("")
  const [img,setImg] = useState();
  const [inputs,setInputs] = useState({ owner: "",users:[],groupName:"",uploadImage:"",expenseGroupId:""});
  const [loading,setLoading] = useState(false);
  console.log("create inputs",JSON.stringify(inputs))

  const selectedUser = async(group,id) =>{
    //  console.log("group",JSON.stringify(group.members))
    //  setSelectedPerson([... group.members])


    setInputs({owner: "",users:[],groupName:"",uploadImage:""})
    setSelectedPerson([])
    console.log(group);
    setLoading(true);
    setErrorContainer("");
    const userData = await axios.post(`${process.env.REACT_APP_URL}/expense/memberDetails`,{members:[...group]},{withCredentials:true})
    console.log(userData.data)
    setSelectedPerson([...userData.data])
    setInputs((prev)=>{
      return {... prev, owner:userData.data[0].name,expenseGroupId:id}
    })
    setLoading(false)
  }

  const handlerInputs = (e) =>{
     console.log(e)
     setErrorContainer("");
     setInputs((prev)=>{
       return {...prev, [e.target.name]:e.target.value}
     })
  }

  const handleImageUpload = async(file) => {
    console.log(file)
    const data = new FormData()
    data.append("file",file);
    data.append("upload_preset","first_time_cloudinnary")
    data.append("cloud_name","dnitpjr1v")

    const res = await fetch("https://api.cloudinary.com/v1_1/dnitpjr1v/image/upload",{
        method:"POST",
        body:data
    })

    const imageUrl = await res.json()
    console.log("image urlk",imageUrl)

    setInputs((prev)=>{
        return {...prev, uploadImage:imageUrl.url}
    })

  }

    useEffect(()=>{
      img && handleImageUpload(img)
    },[img])

  const handleUserInputs = (user) => {
    console.log("ur yser",user)
    setErrorContainer("");
     setInputs((prev)=>{
      //problem is its creating new user every time we want too update it
       //return {...prev, users:[...prev?.users, user]}
       return {...prev, users: prev.users.some((u)=>u.id==user.id) ? prev.users.map((item)=>item.id==user.id ? {...item,expense:user.expense} : item) : [...prev.users,user]}
     })
  }

  const handleSubmit = async() => {

    let {owner,groupName,expenseGroupId,users,uploadImage} = inputs;
    const selectedMembers = selectedPerson;
    try{
      setSelectedPerson([])
      setLoading(true)

      console.log("udwdw",selectedMembers)
      if(groupName=="" || groupName==undefined) return setErrorContainer("title required")
        const owner2 = users.filter((i)=>owner==i.name)

        if(owner2.length==0){

          const result = selectedMembers.find((i)=>i.name==owner)
          const ownerMember = {id:result._id,name:result.name,expense:0};
          // const ownerMember = selectedMembers.map((i)=>{

            // if(i.name==owner) return {id:i._id,name:i.name,expense:0}
          // }).filter((i)=>(i.name==owner))[0]

          users = [...users, ownerMember]
        }

        console.log("ur inputs ewwew",users)

        const negativeCheck = users.filter((i)=>i.expense<0);
        if(negativeCheck.length>0) return setErrorContainer("Cannot enter number in negative")
        await axios.post(`${process.env.REACT_APP_URL}/expense/createExpenseDetails`,{groupName,expenseGroupId,users,uploadImage,owner},{withCredentials:true})
      const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})
       dispatch(loginStart());
       dispatch(loginSuccess(getCurrentLoggedInUpdate.data));

      setInputs({owner: "",users:[],groupName:"",uploadImage:""})
      setLoading(false)
    }catch(e){
      console.log(e)
      const message = e.response?.data?.message
      setSelectedPerson([...selectedMembers]);
      if(message.includes('duplicate key error')) return setErrorContainer('This expense already exist')
      setErrorContainer(message)
    }
    }



    useEffect(()=>{
      console.log("seadteh",search)
      const searchRes = async()=>{
       if(search)
       {
        const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/ExpenseGroup/searchExpenseGroup`,{search},{withCredentials:true});
        console.log("searcged data group",currentUserData.data)
        const ids = currentUserData.data.map((i)=>i._id)
        setGroup([...ids]);

       }else{
        setGroup([...currentUser.createExpenseGroup])
       }
      }

      const debounceTimeout = setTimeout(() => {
        searchRes()
      }, 500);

      return () => {
        clearTimeout(debounceTimeout);

      };

   },[search])


   console.log("gropoi",group)

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
                    <ExpenseGroups  group={item} key={item} selectedUser={selectedUser}/>
                    </li>
                ))
                }
              </ul>}
            </div>

            <div className="CreateExpenseSheetList addition">
              <div className="CreateExpenseSheetInputWrapper">
                  <div className="ExpenseGroupTitleAndSubmit">
                    <h1 className='ExpenseGroupTitle'>Create expense</h1>
                    <button onClick={handleSubmit} className='ExpenseGroupSubmit'>Submit</button>
                  </div>
                  {errorContainer!="" && <div className="ErrorContainer expenseSummary">
                   {errorContainer}
                  </div>}
                  <h4 className='CreateExpenseSheetName'>Title</h4>
                  <input name='groupName' type="text" placeholder='Enter group name' value={inputs?.groupName} className='CreateExpenseSheetListInput' onChange={(e)=>handlerInputs(e)}/>
                  <h4 className='CreateExpenseSheetName'>Upload image</h4>

                  <div className="evidenceAttachContainer" style={{margin: "10px 0"}}>
                    <FileUpload/>
                    <input placeholder='upload image' name='uploadImage' onChange={(e)=>setImg(e.target.files[0])}  type='file' accept='image/*'/>
                  </div>

                  <h4>Paid by</h4>
                  <select name='owner' className='CreateExpenseSheetListInput select' value={inputs.owner} onChange={(e)=>handlerInputs(e)}>
                    { selectedPerson?.map((item)=>(
                      <option value={item?.name}>{item?.name}</option>
                    ))
                    }
                  </select>
                  <h4>Enter expense</h4>
                  <div className="CreateExpenseSheetUserAndExpenseContainer">
                    {/* {selectedPerson.length>0 ?
                      selectedPerson?.map((item)=>(
                          <>
                          <CreateExpenseInputs users={item} handleUserInputs={handleUserInputs}/>
                          </>
                        )) :
                        <div className="dialogueContainer1">
                            select group

                      </div>
                    } */}
                    {selectedPerson.length==0 ?
                      loading ?
                      Array.from({ length: 5 }, () => 0).map(()=>(
                                    <CreateExpenseInputLoading/>
                      ))
                      :
                      <>
                      {<div className="dialogueContainer1">
                          select group
                      </div>}
                      </>
                      :
                      selectedPerson?.map((item)=>(
                          <>
                          <CreateExpenseInputs users={item} handleUserInputs={handleUserInputs}/>
                          </>
                        ))
                    }
                  </div>

              </div>


            </div>
          </div>
         </div>
      </div>
    </div>
  )
}
