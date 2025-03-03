import React from 'react'
import "./notificationLoading.css"

export default function NotificationLoading() {
  return (
        <div className="NotificationLoading recived">
        <div className="NotificationLoadingDetails">
            <div className="NotificationLoadingUserName">
                <img className='NotificationLoadingImage' alt="" />
                karthik
               <div className='NotificationLoadingDetail'></div>
                <div className='NotificationLoadingDetail'></div>
                <div className='NotificationLoadingDetail'></div>
            </div>
            <div className="NotificationLoadingTimeStamp"></div>
        </div>
        <hr/>
        <div className="NotificationLoadingContent"></div>
    </div>
  )
}
