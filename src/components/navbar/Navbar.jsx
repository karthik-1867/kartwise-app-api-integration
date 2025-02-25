import React from 'react'
import '../navbar/navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { SearchOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
export default function Navbar() {
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
           <Avatar className='NavbarLoginLogo'/>
           Karthik venkatachalam
         </div>
      </div>
    </div>
  )
}
