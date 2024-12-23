import React, { useState } from 'react'
import { RxDoubleArrowUp } from "react-icons/rx";
import { Route, Routes } from 'react-router';
import Sidebar from '../includes/sidebar/Sidebar';
import Nav from '../includes/nav/Nav';
import Dashboard from '../Dashboard/Dashboard';
import Accounts from '../Account/Accounts';

const AdminApp = () => {
    const [logoutModal, setLogoutModal] = useState(false);
	const [category_list, setCategory_list] = useState([]);

    const logoutModalController = () => {
      setLogoutModal(!logoutModal)
    }

    
    const scroll_to_top = () => {
      window.scrollTo(0, 0); 
    }
    
  return (
    <>
      <Sidebar handleRemoveAuthModal={logoutModalController}  />
      <main id='main'>
        <Nav category_list={category_list} handleRemoveAuthModal={logoutModalController} />
          <Routes>

            <Route path='/users' element={<Accounts />} />

            <Route path='/' element={<Dashboard />} />
          </Routes>
          <div onClick={scroll_to_top} className='back_to_top'><RxDoubleArrowUp /></div>
      </main>
    
    {/* {
        logoutModal && <Logout  handleRemoveAuthModal={logoutModalController} />
    } */}
    </>
  )
}

export default AdminApp