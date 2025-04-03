import React from 'react'
import '../navbar/navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { SearchOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
export default function Navbar({handlesearch}) {

  const currentUser = useSelector((state)=>state.user.user);


  return (
    <div className='NavbarContainer'>
      <div className="NavbarWrapper">
         {/* <div className="NavbarLogo">
            <span className='LogoFirst'>Track</span>
            <span className='NavLogoSecond'>Wise</span>
         </div> */}
          <div className="kartwiseLogo" style={{fontSize:"50px",color:"transparent"}}>
                <span style={{color:"rgb(230, 17, 17)"}}>
                Track
                </span>
                <span style={{color:"green"}}>
                Wise
                </span>
          </div>
         <div className="NavbarSearch">
            <SearchOutlined className='NavbarSearchIcon'/>
            <input type="text" onChange={(e)=>handlesearch(e.target.value)} className='NavbarSearchInput' placeholder='Search'/>
         </div>
         <div className="NavbarLogin">
           {currentUser?.profilePicture ?
           <img src={currentUser.profilePicture} alt="" className='NavbarLoginLogo' />
           :
           <Avatar className='NavbarLoginLogo'/>}
           {currentUser?.name}
         </div>
      </div>
    </div>
  )
}
