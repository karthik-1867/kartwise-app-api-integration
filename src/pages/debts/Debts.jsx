import React, { useEffect, useState } from 'react'
import "../debts/debts.css"
import DebtCard from '../../components/debtCard/DebtCard'
import { FileUpload } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ExpenditureLoader from '../../components/expenditureLoader/ExpenditureLoader'
import ExpenseCardLoading from '../../components/expenseCardLoading/ExpenseCardLoading'
import { loginStart, loginSuccess } from '../../redux/userSlice'
import AckCard from '../../components/ackCard/AckCard'
import { io } from "socket.io-client";

export default function Debts() {

  const currentLoggedInUser = useSelector((state)=>state.user.user);
  const [deptList,setDeptList] = useState([])
  const [ack,setAck] = useState([])
  const [user,setUser] = useState("")
  const [input,setInput] = useState({})
  const [img,setImg] = useState()
  const [loading,setLoading] = useState(false)
  const [errorContainer,setErrorContainer] = useState("");
  const dispatch = useDispatch()

  console.log("sfddse",JSON.stringify(user))

 const selectedUser = async(dept) => {
    console.log("selected usrt",dept)
    setErrorContainer("")
    setUser(dept);
    setAck([])

    console.log("logedin",currentLoggedInUser.AcknowledgeMessageStatus,dept.groupid)
    // const currentMessage = []
    // for (let i of currentLoggedInUser.AcknowledgeMessageStatus){
    //    if(i.groupid==dept.groupid){
    //        currentMessage.push(i)
    //    }
    // }
    const currentMessage = [...currentLoggedInUser.AcknowledgeMessageStatus.filter((i)=>(i.groupid===dept.groupid))];
    console.log("ckj",currentMessage)

    setAck([...currentMessage])

    setInput((prev)=>{
        return {...prev,expense:dept.expense,groupName:dept.groupName,groupid:dept.groupid,ownerid:dept.id,name:dept.name,owner:dept.owner,paidBack:0,alreadyPaid:dept.paidBack,status:dept.status,acknowledgeStatus:"pending"}
    })
  }

  const updatePaidBack = (e) =>{
    setErrorContainer("")
       setInput((prev)=>{
        return {...prev,paidBack:e.target.value}
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

    setInput((prev)=>{
        return {...prev, evidence:imageUrl.secure_url}
    })

  }

  const submitMessage = async() => {

    const {ownerid,groupid,groupName,name,owner,expense,paidBack,status,alreadyPaid,acknowledgeStatus,evidence} = input;
    console.log(ownerid,groupid,groupName,name,owner,expense,paidBack,status,alreadyPaid,evidence)


    try{
        setErrorContainer("")
            setLoading(true)
            const currentLoggedin = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentLoggedInUser?._id}`,{withCredentials:true})

            const acknowledgeid = currentLoggedin.data.AcknowledgeMessageStatus
            console.log("gfhgj",acknowledgeid)
            const acknowledgeMessage = []
            for (let i of acknowledgeid){
                const currentLoggedin = await axios.get(`${process.env.REACT_APP_URL}/acknowledge/getMessage/${i.ackid}`,{withCredentials:true})
                if(i.groupid == groupid){

                  acknowledgeMessage.push(currentLoggedin.data)
                }
            }
        // const acknowledgeMessage = await axios.get(`${process.env.REACT_APP_URL}/acknowledge/getMessageBasedOnGroupName/${groupName}`,{withCredentials:true})
        console.log("ghfjh",acknowledgeMessage)
        if(acknowledgeMessage?.length>0){
            const totalPaidBack = acknowledgeMessage.filter((i)=>(i.acknowledgeStatus=='pending')).reduce((i,c)=>(i+c.paidBack),0)
            console.log("totalPaid",(+(totalPaidBack)+ +(paidBack)))

            if(+totalPaidBack + +alreadyPaid == expense) return setErrorContainer(`full payment request setteled waiting for owner approval`)
            if((+alreadyPaid  + +totalPaidBack + +paidBack) > expense) return setErrorContainer(`paying more then expense by ${(+alreadyPaid +totalPaidBack + +paidBack) - expense} please pay only ${expense - (+totalPaidBack + +alreadyPaid)}`)
        }else{
            if(+paidBack + +alreadyPaid > expense) return setErrorContainer(`paying more then expense by ${(+paidBack + +alreadyPaid) -expense} please pay only ${expense - alreadyPaid}`)
        }

    const postMessage = await axios.post(`${process.env.REACT_APP_URL}/acknowledge/createMessage`,{ownerid,groupid,groupName,name,owner,expense,paidBack,status,acknowledgeStatus,evidence},{withCredentials:true})
        console.log(postMessage.data)
        setInput({paidBack:0})

        const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentLoggedInUser._id}`,{withCredentials:true})

        dispatch(loginStart())
        dispatch(loginSuccess(getCurrentLoggedInUpdate.data))
        fetchDeptList()
        setAck("")
        setUser("")
        setLoading(false)
    }catch(e){
       console.log(e)
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
        fetchDeptList();
      });

        return () => {
          socket.disconnect();
        };
  },[])


    useEffect(()=>{
      img && handleImageUpload(img)
    },[img])


  const fetchDeptList = async() => {
    setLoading(true)
    const getExpenseList = [...currentLoggedInUser.createExpenseInfo];
    console.log("lenght",getExpenseList)

    let count = 0
    const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentLoggedInUser._id}`,{withCredentials:true})

    dispatch(loginStart())
    dispatch(loginSuccess(getCurrentLoggedInUpdate.data))

    const deptGroup = await axios.get(`${process.env.REACT_APP_URL}/expense/pendingAmount`,{withCredentials:true})

    // for (let current_input of getExpenseList){

    //     const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/expense/getExpenseDetails/${current_input}`,{withCredentials:true})
    //     const users = [...getCurrentLoggedInUpdate.data.users]
    //     const urExpense = users.filter((i)=>i.id==currentLoggedInUser._id)[0]

    //     console.log("filtered expense",urExpense,current_input)

    //     if(urExpense?.status !== 'paid')
    //     {
    //         deptGroup.push({...urExpense,owner:getCurrentLoggedInUpdate.data.owner,groupName:getCurrentLoggedInUpdate.data.groupName,groupid:getCurrentLoggedInUpdate.data._id})
    //     }
    // }
    console.log("final count",deptGroup.data)
    setDeptList([...deptGroup.data])
    setLoading(false)
  }

  return (
    <div className='DebtsContainer'>
       <div className="DebtsMessageContainer">
          <h1>Debts</h1>
          <ul className='DebtsLists'>
            {loading ?
             Array.from({ length: 19 }, () => 0).map(()=>(

                <ExpenseCardLoading/>

            ))
            :
            <>
            {deptList.length!=0 ? deptList.map((dept)=>(
            <li>
                <DebtCard dept={dept} selectedUser={selectedUser}/>
            </li>
            )) :

            <div className='DeptDialogueContainer'>

            <span className='DeptDialogue'>No dept</span>
            </div>

            }
          </>
            }
          </ul>
       </div>
       {user && <div className="DebtAcknowledgeOwner">
          <h1>Attach payment evidence</h1>
          <div className="DebtOwnerAndGroup">
            <span className='expenseCardExpenditurespent ligh'>
            expense name : {user.groupName}
            </span>
            <span className='expenseCardExpenditurespent ligh'>
            owner : {user.owner}
            </span>
          </div>
          <div className="deptInputs">
            <span>Amount</span>
            <input  onChange={(e)=>updatePaidBack(e)} placeholder="enter amount" type="number" className="deptAknowledgeInput" />
            <span>Evidence</span>
            <div className="evidenceAttachContainer">
              <FileUpload/>
              <input placeholder='attach evidence' name="imgUrl" onChange={(e)=>setImg(e.target.files[0])} type='file' accept='image/*'/>
            </div>
          </div>
          <button onClick={submitMessage} className='submitAcknowledge'>Send</button>
          {errorContainer!="" && <div className="ErrorContainer expenseSummary">
            {errorContainer}
          </div>}
       </div>}
       {ack.length>0 && <div className="DebtsMessageContainer">
          <h1>Acknowledge Status</h1>
          <ul className='DebtsLists'>
            {loading ?
             Array.from({ length: 19 }, () => 0).map(()=>(

                <ExpenseCardLoading/>

            ))
            :
            ack.map((item)=>(
            <li>
                <AckCard ackid={item} key={item.ackid}/>
            </li>
            ))
            }
          </ul>
       </div>}
    </div>
  )
}
