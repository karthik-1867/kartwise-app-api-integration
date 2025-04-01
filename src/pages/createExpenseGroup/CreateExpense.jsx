import React, { useEffect, useState } from 'react'
import '../createExpenseGroup/createExpense.css'
import FavUser from '../../components/inviteAcceptedUser/FavUser'
import ExpenseDetails from '../../components/expenseDetails/ExpenseDetails'
import CreateExpenseAddUser from '../../components/createExpenseAddUser/CreateExpenseAddUser'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { loginStart, loginSuccess } from '../../redux/userSlice'
import CreateExpenseAddUserLoadingLoading from '../../components/createExpenseAdduserLoadingComponent/CreateExpenseAddUserLoading'
import { FileUpload } from '@mui/icons-material'



export default function CreateExpense({search}) {

  const currentUser = useSelector((state)=>state.user.user);
  const [inviteAcceptedUsers,setInviteAcceptedUsers] = useState([...currentUser.inviteAcceptedUsers])
  const [selectUser,setSelectedUser] = useState([]);
  const [inputs,setInputs] = useState({})
  const [img,setImg] = useState();
  const [errorContainer,setErrorContainer] = useState("")
  const dispatch = useDispatch();
  const createGroup = useSelector((state)=>state?.createExpenseGroup.createExpenseGroup)

  console.log("inputs",JSON.stringify(inputs));
  console.log("invite acceasadsad",JSON.stringify(inviteAcceptedUsers))
  console.log("selectedUserdg",selectUser)

  const addCreateExpenseUser = (user) => {
    console.log("grsr",user)
    // const paymentInfos = {...user,paymentToBeDone:0,lentByOwner:0,paymentTobeReceived:0,isPayer:false,amountSpent:0,amountReceived:0}
    if(!selectUser.includes(user)){
     setSelectedUser((i)=>[...i,user]);
    }

    setInputs((prev)=>{
      return {...prev, members:[...selectUser,user]}
  })
  }

  const removeExpenseUser = (user) => {
    const selectedUsers = selectUser.filter((item)=>item != user)

    setSelectedUser(selectedUsers)
    setInputs((prev)=>{
      return {...prev, members:selectedUsers}
  })
  }

  const inputSet = (e) => {
    setErrorContainer("")
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

  const submitInputs = async() =>{

    try{

      console.log(inputs)

      if(!inputs.title || inputs.title=="") return setErrorContainer("Title required")
      if(!inputs.members || inputs.members?.length==0) return setErrorContainer("add member")


      await axios.post(`${process.env.REACT_APP_URL}/ExpenseGroup/createGroup`,{title:inputs.title,uploadImage:inputs.uploadImage,members:inputs.members},{withCredentials:true})

      const userData = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})
      console.log("creiouw",JSON.stringify(userData))
      dispatch(loginStart())
      dispatch(loginSuccess(userData.data))
      setSelectedUser([]);
      setInputs((prev)=>{
        return {...prev, title:"",uploadImage:"",members:[]}
      })
      setErrorContainer("")
    }catch(e){
      console.log(e)
      const errorMessage = e.response?.data.message
      if(errorMessage.includes('duplicate key error')) return setErrorContainer('This group already exist')
      console.log("ur emr",errorMessage)
    }
  }

    useEffect(()=>{
      img && handleImageUpload(img)
    },[img])


    useEffect(()=>{
      console.log("seadteh",search)
      const searchRes = async()=>{
       if(search)
       {
        const currentUserData = await axios.post(`${process.env.REACT_APP_URL}/user/searchUser`,{search},{withCredentials:true});
        console.log("searcged data",currentUserData)
        const ids = currentUserData.data.map((i)=>i._id)
        const filterId = ids.filter((i)=>currentUser.inviteAcceptedUsers.includes(i));
        setInviteAcceptedUsers([...filterId])
       }else{
        console.log("empty search",currentUser.inviteAcceptedUsers)
        setInviteAcceptedUsers([...currentUser.inviteAcceptedUsers])
       }
      }



      const debounceTimeout = setTimeout(() => {
        searchRes()
      }, 500);

      return () => {
        clearTimeout(debounceTimeout);

      };


   },[search])


   console.log("updated invited user",inviteAcceptedUsers)
  return (
    <div className='createExpenseGroupContainer'>
      <div className="ExpenseGroupWrapper">
         <div className="ExpenseGroupLists">
          <div className="ExpenseListWrapper">
            <div className="ExpenseGroupList addition">
              <h1 className='ExpenseGroupTitle'>Bookmarked users view</h1>
              {!inviteAcceptedUsers || inviteAcceptedUsers?.length == 0 ?
              <div className="ExpenseContainerDialogue">
                start adding fav user to create expense group and expense
                <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
                <button className='ExpenseContainerDialogueButton'>Add Fav user</button>
                </Link>
              </div>
              :
              <ul className='ExpenseGroupListUl ad1'>
                {inviteAcceptedUsers?.map((item)=>(
                <li >
                <CreateExpenseAddUser user={item} addUser={addCreateExpenseUser} key={item} isSelectedUser='false'/>
                </li>
                ))
                }
              </ul>}
            </div>

            <div className="ExpenseGroupList addition">
              <div className="ExpenseGroupListContainer">
                <div className="ExpenseGroupTitleAndSubmit">
                  <h1 className='ExpenseGroupTitle'>Create expense Group</h1>
                  <button onClick={submitInputs} className='ExpenseGroupSubmit'>Submit</button>
                </div>
                {errorContainer!="" && <div className="ErrorContainer expenseSummary">
                   {errorContainer}
                  </div>}

                   <h4 className='ExpenseGroupName'>Title</h4>
                <input type="text" placeholder='Enter group name' value={inputs?.title} name='title' onChange={(e)=>inputSet(e)} className='ExpenseGroupListInput'/>
                <h4 className='ExpenseGroupName'>Upload image</h4>
                 <div className="evidenceAttachContainer">
                    <FileUpload/>
                    <input placeholder='upload image' name='uploadImage' onChange={(e)=>setImg(e.target.files[0])} type='file' accept='image/*'/>
                  </div>
                <h4 className='ExpenseGroupName'>Member</h4>
                { selectUser?.length == 0 ?
                    (<div className="dialogueContainer">
                                Add members from left list
                    </div>)
                    :

                    (<ul className='ExpenseGroupListUl'>

                      {selectUser?.map((item)=>(
                        <li className='extra'>
                        <CreateExpenseAddUser user={item} key={item.id} isSelectedUser='true' removeUser={removeExpenseUser}/>
                        </li>
                      ))}
                    </ul>)
                }
              </div>
            </div>
          </div>
         </div>
      </div>
    </div>
  )
}
