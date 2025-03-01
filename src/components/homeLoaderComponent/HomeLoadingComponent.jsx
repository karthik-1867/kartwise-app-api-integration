import React from 'react'
import "./homeloadingcomponent.css"

export default function HomeLoadingComponent() {
  return (
    <div className='HomeloadingContainer' >
      <div className="homeloadingWrapper">
         <div className="homeLoadingLogo">i</div>
         <div className="hometopandBottomText">
          <div className='hometoptext'>{}</div>
          <div className='homebottomtext'>{}</div>
         </div>
      </div>
    </div>
  )
}
