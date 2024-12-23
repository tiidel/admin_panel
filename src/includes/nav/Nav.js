import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = ({ user }) => {
  console.log("user", user);
  return (
    <>
    <nav className='navbar'>
      <div className='nav_left'>
        <Link to ='' className='nav_link'>Overview</Link>
        <Link to ='/users' className='nav_link'>customers</Link>
        <Link to ='/categories' className='nav_link'>Write Article</Link>
        <Link to ='/settings' className='nav_link'>Settings</Link>
        <Link to ='/notifications' className='nav_link'>Notifications</Link>
      </div>
      <div className='nav_right'>
        <div className="nav_profile" >
          <span>Hi, { user?.user?.first_name }</span>
          <div className='profile'>{ user?.user?.first_name && user.user.first_name[0]  }</div>
        </div>
      </div>
    </nav>
    
    </>
  )
}

export default Nav