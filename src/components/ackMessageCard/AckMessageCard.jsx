import { Download, Info } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../ackMessageCard/ackMessage.css"

export default function AckMessageCard({ack,acceptRequest,rejectRequest}) {

  const [expenseInfo,setExpenseInfo] = useState();

  console.log("expenseinfo",expenseInfo)

  const accept = () => {
     acceptRequest(expenseInfo)
  }

  const reject = () => {
    rejectRequest(expenseInfo)
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(expenseInfo?.evidence, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream", // ?? Ensures binary data
        },
      });

      if (!response.ok) throw new Error("Failed to fetch the image");
      const blob = await response.blob(); // ?? Convert to Blob
      console.log(blob)
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a hidden link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "evidence.jpg"; // ?? Set the file name
      document.body.appendChild(link);
      link.click(); // ?? Trigger download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };


  useEffect(()=>{
    const getMessage = async()=>{

        const acknowledgeMessage = await axios.get(`${process.env.REACT_APP_URL}/acknowledge/getMessage/${ack}`,{withCredentials:true})
        setExpenseInfo(acknowledgeMessage.data)
    }

    getMessage();
  },[])

  const modifiedUrl = expenseInfo?.evidence.replace("/upload/", "/upload/fl_attachment/");


  return (
    <div className="UpdateContainer">
    <div className="UpdateContainerTop">
        <div className="UpdateContainerUserDetails">
            {expenseInfo?.profilePicture ?<img src={expenseInfo?.profilePicture} alt="" className='updateExpenseProfile' />:<Avatar/>}
            {expenseInfo?.name}
            {` `}
            <span className='UpdateContainerExpense'>Group :{expenseInfo?.groupName}</span>
            <span className='UpdateContainerPaid'>paid : {expenseInfo?.paidBack}</span>
            <span className='UpdateContainerRemaining'>expense : {expenseInfo?.expense}</span>

            <div style={{display:"flex",alignItems:"center",gap:"10px",background: "white", color: "black", fontSize: "14px", padding: "3px", borderRadius: "10px",fontWeight:"300"}}>

            <Download/>
            <a
            href={modifiedUrl}
            style={{textDecoration:"none",color:"black"}}
            download
            >
            Download Evidence
          </a>
            </div>
        </div>
        <div className="AcceptOrReject">
            <button onClick={accept} className="requestButton">Accept</button>
            <button onClick={reject} className="requestButton">Reject</button>
        </div>
    </div>
</div>
  )
}
