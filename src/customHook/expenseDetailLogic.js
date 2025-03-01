import axios from "axios"
import { useEffect, useState } from "react"

const useExpenseDetailsFetcher = (id) =>{

    const [expensedata,setExpenseData] = useState([]);
    const [status,setStatus] = useState("")
    const [groupName,setGroupName] = useState("")
    const expenseId = id
    useEffect(()=>{

        const getExpense = async() =>{

            if(!id) return setExpenseData();setGroupName();

            console.log(id)
            const expenseDetails = await axios.get(`${process.env.REACT_APP_URL}/expense/getExpenseDetails/${id}`,{withCredentials:true})
            setStatus(expenseDetails.data.allSettled)
            setGroupName(expenseDetails.data.groupName)
            const ids = expenseDetails.data.users.map((i)=>i.id)
            console.log("here is ur ids",ids)
            const userData = await axios.post(`${process.env.REACT_APP_URL}/expense/memberDetails`,{members:[...ids]},{withCredentials:true})
            console.log(userData.data);

            const data = userData.data.map((i)=>{
                let user = expenseDetails.data.users.filter((item)=>i._id==item.id)[0]
                console.log(user);
                let {name,profilePicture} = i;
                let {expense,paidBack,owner,status} = user;
                return {id:i._id,name,profilePicture,expense,paidBack,owner,status}
            })
            console.log("custom logic data",JSON.stringify(data))
            setExpenseData(data)
        }

        getExpense();

    },[id]);




    return {expensedata,groupName,status,expenseId}
}

export default useExpenseDetailsFetcher;