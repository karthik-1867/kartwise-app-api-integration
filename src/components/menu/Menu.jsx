import React from 'react'
import '../menu/menu.css'
import { Groups, Home, Logout, Notifications, PriceChange, SaveAs} from '@mui/icons-material'
import BookIcon from '@mui/icons-material/Book';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MessageIcon from '@mui/icons-material/Message';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Menu() {

  const navigate = useNavigate();
  const handleSignout = async() => {
     await axios.post(`${process.env.REACT_APP_URL}/user/signout`,{},{withCredentials:true})
     navigate("/")
  }

  return (
    <div className='MenuContainer'>
      <div className="MenuWrapper">
         <div className="MenuSocial">
            <h1 className='title'>Social users</h1>
            <Link to="/home" style={{textDecoration:'none',color:'inherit'}}>
            <div className="MenuItems">
              <Home/>
              <span>Home</span>
            </div>
            </Link>
            <Link to="/fav" style={{textDecoration:'none',color:'inherit'}}>
            <div className="MenuItems">
              <BookIcon/>
              <span>Dashboard</span>
            </div>
            </Link>
            <Link to="/expenseGroup" style={{textDecoration:'none',color:'inherit'}}>
            <div className="MenuItems">
              <Groups/>
              <span>Create expense group</span>
            </div>
            </Link>
            <Link to="/editGroup" style={{textDecoration:'none',color:'inherit'}}>
            <div className="MenuItems">
              <SaveAs/>
              <span>Edit expense group</span>
            </div>
            </Link>
         </div>
         <div className="MenuExpense">
          <h1 className='title'>Expense dashboard</h1>
          <Link to="/expenseSheet" style={{textDecoration:'none',color:'inherit'}}>
          <div className="MenuItems">
              <AttachMoneyIcon/>
              <span>Create expense</span>
          </div>
          </Link>
          <Link to="/expenseSummary" style={{textDecoration:'none',color:'inherit'}}>
          <div className="MenuItems">
            <PriceChange/>
            <span>Edit Expense</span>
          </div>
          </Link>
          <Link to="/acknowledge" style={{textDecoration:'none',color:'inherit'}}>
          <div className="MenuItems">
            <PlaylistAddCheckIcon/>
            <span>Acknowledge</span>
          </div>
          </Link>
          <Link to="/debts" style={{textDecoration:'none',color:'inherit'}}>
          <div className="MenuItems">
            <AnnouncementIcon />
            <span>Debts</span>
          </div>
          </Link>
          <Link to="/message" style={{textDecoration:'none',color:'inherit'}}>
          <div className="MenuItems">
            <Notifications />
            <span>Notifications</span>
          </div>
          </Link>

          <div className="MenuItems" onClick={handleSignout}>
            <Logout/>
            <span>Logout</span>
          </div>

         </div>
         <div className="MenuExpense">
          <h1 className='title'>Quick access</h1>
          <div className="MenuItems">
              <Avatar/>
              <span>Ooty</span>
          </div>
          <div className="MenuItems">
            <Avatar/>
            <span>Manali</span>
          </div>
          <div className="MenuItems">
            <Avatar/>
            <span>Coimature</span>
          </div>

         </div>
      </div>
    </div>
  )
}
