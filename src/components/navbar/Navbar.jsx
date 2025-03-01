import React from 'react'
import '../navbar/navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { SearchOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
export default function Navbar() {

  const currentUser = useSelector((state)=>state.user.user);


  return (
    <div className='NavbarContainer'>
      <div className="NavbarWrapper">
         <div className="NavbarLogo">
            KartWise
         </div>
         <div className="NavbarSearch">
            <SearchOutlined className='NavbarSearchIcon'/>
            <input type="text" className='NavbarSearchInput' placeholder='Search'/>
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
