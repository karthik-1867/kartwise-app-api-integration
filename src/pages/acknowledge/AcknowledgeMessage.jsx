import React, { useEffect, useState } from 'react'
import UpdateExpenseCard from '../../components/updateExpenseCard/UpdateExpenseCard'
import AckMessageCard from '../../components/ackMessageCard/AckMessageCard'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess } from '../../redux/userSlice'
import axios from 'axios'

export default function AcknowledgeMessage() {
      const [errorContainer,setErrorContainer] = useState()
      const [ackMessage,setAckMessage] = useState([])
      const currentUser = useSelector((state)=>state.user.user)
      const dispatch = useDispatch();
    
      
      const acceptRequest = async(accept) => {

          console.log(accept)
          try{
            const {ownerid,expense,paidBack,groupid,_id} = accept
          await axios.post(`${process.env.REACT_APP_URL}/expense/updateExpenseDetails/${groupid}`,{users:[{id:ownerid,expense:expense,paidBack:paidBack}]},{withCredentials:true})
          const result = await axios.post(`${process.env.REACT_APP_URL}/acknowledge/updateAcceptOrRejectMessage/${_id}`,{acknowledgeStatus:"accept"},{withCredentials:true})
          
          GetMessage()
          console.log("resuk",result)
          
          }catch(e){
            console.log(e)
          }
         
          // try{
        //     setLoading(true)
        //     const UpdateInput = inputs.users.map((i)=>{return {id:i.id,paidBack:i.paidBack,expense:i.expense}});
        //     await axios.post(`${process.env.REACT_APP_URL}/expense/updateExpenseDetails/${id}`,{users:[...UpdateInput]},{withCredentials:true})
        //     navigate(-1);
      
        //   }catch(e){
        //     const error = e.response.data.message
        //     setErrorContainer(error);
        //   }

      }

      const rejectRequest = async(reject) => {
       console.log(reject)
       try{
        const {ownerid,expense,paidBack,groupid,_id} = reject
    
        const result = await axios.post(`${process.env.REACT_APP_URL}/acknowledge/updateAcceptOrRejectMessage/${_id}`,{acknowledgeStatus:"reject"},{withCredentials:true})
        
      GetMessage()
      console.log("resuk",result)
      
      }catch(e){
        console.log(e)
      }
       
      }
      

      const GetMessage = async() =>{
        
        console.log("callled getMessage")
        const getCurrentLoggedInUpdate = await axios.get(`${process.env.REACT_APP_URL}/user/getUser/${currentUser._id}`,{withCredentials:true})

        dispatch(loginStart())
        dispatch(loginSuccess(getCurrentLoggedInUpdate.data))
        setAckMessage([...getCurrentLoggedInUpdate?.data.Acknowledge])
        }


      useEffect(()=>{

          GetMessage()
      },[])


      return (
    <div className='UpdateExpenseContainer'>
          {errorContainer && <div className="ErrorContainer">
            {errorContainer}
          </div>}
      <div className="UpdateExpenseWrapper">
        <div className="UpdateTitleAndSaveButton">
            <h1>Request</h1>
        </div>
        {(<ul className='UpdateExpenseList'>
            {ackMessage.length!= 0 ? ackMessage.map((id)=>(
                <li>
                    <AckMessageCard ack={id} key={id} acceptRequest={acceptRequest} rejectRequest={rejectRequest}/>
                </li>
            ))
             :<div className='ackDialogueContainer'>
                <span className='ackDialogue'>No Payment approval request</span>
             </div>
            }
            </ul>)

         } 
    </div>
   </div>
  )
}
