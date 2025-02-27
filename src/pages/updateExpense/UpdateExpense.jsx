import React, { useState } from 'react'
import "./updateExpense.css"
import { Avatar } from '@mui/material'
import { Info } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import useExpenseDetailsFetcher from '../../customHook/expenseDetailLogic'
import UpdateExpenseCard from '../../components/updateExpenseCard/UpdateExpenseCard'
import axios from 'axios'

export default function UpdateExpense() {

  const {id} = useParams();
  const navigate = useNavigate()
  const [inputs,setInputs] = useState({users:[]});
  console.log("params",id);
  console.log("setInputs value",JSON.stringify(inputs))
  const {expensedata,status} = useExpenseDetailsFetcher(id);
  const selectGroup = expensedata;
  const updatedGroup = selectGroup?.filter((i)=>i.status!="paid")
  const [errorContainer,setErrorContainer] = useState()

  console.log("in update expense ",JSON.stringify(selectGroup),status);



  const handleInputs = (inputData) =>{
    console.log("inputData",JSON.stringify(inputData))
    setErrorContainer()
    if(inputData?.paidBack>inputData?.expense){
      return setErrorContainer(`paying more then expense by ${(inputData?.paidBack+inputData?.alreadyPaid)-inputData.expense}. Please pay only ${inputData.expense-inputData?.alreadyPaid}`)
    }
    
    setInputs((prev)=>{
       return {...prev, users : prev.users?.some((i)=>i.id==inputData.id) ? prev.users?.map((i)=>i.id==inputData.id ? {...i,paidBack:inputData.paidBack} : i) : [...prev.users,inputData]}

      // return {...prev, users:[...prev?.users, inputData]}
     })
  }


  const submitInputs = async() => {
    
    try{
      const UpdateInput = inputs.users.map((i)=>{return {id:i.id,paidBack:i.paidBack,expense:i.expense}});
      await axios.post(`${process.env.REACT_APP_URL}/expense/updateExpenseDetails/${id}`,{users:[...UpdateInput]},{withCredentials:true})
      navigate(-1);
    }catch(e){
      const error = e.response.data.message
      setErrorContainer(error);
    }
  }

  return (
    <div className='UpdateExpenseContainer'>
          {errorContainer && <div className="ErrorContainer">
            {errorContainer}
          </div>}
      <div className="UpdateExpenseWrapper">
        <div className="UpdateTitleAndSaveButton">
            <h1>Update Expense</h1>
            <button onClick={submitInputs}>Submit</button>
        </div>
        {status != "allSettled" ? (<ul className='UpdateExpenseList'>
              {updatedGroup.map((i)=>(
                <li>
                    <UpdateExpenseCard expenseInfo={i} handleInputs={handleInputs}/>
                </li>
            ))}
            </ul>)
           : (<div className='UpdateExpenseList flexWrap'>
             
               <span className='finalStatus'>
                allSettled
                </span> 
             </div>)
         } 
    </div>
   </div>
)
}