import React from 'react'
import './sidebar.css'
import {ReactComponent as LogoLines} from './LogoAlt.svg'
import { MdDashboard } from "react-icons/md";
import { HiBookOpen, HiChevronRight } from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidServer } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";
import { RxDownload, RxUpload } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { AiOutlineMessage } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import { useNavigation } from 'react-router';


const Sidebar = ({ handleRemoveAuthModal }) => {
    // const navigate = useNavigation()
  return (
    <aside className='aside_panel'>
        <div className='logo_wrapper'>
            <h1 className='logo'>Tiidel Inc</h1>
            <LogoLines />
        </div>
        <Link to='/' className='dashboard_title dashboard_element'>
            <span className='dashboard_icon'><MdDashboard /></span>
            <span className='dashboard_text'>Dashboard</span>
        </Link>

        <Link to='/books' className='dashboard_element'>
            <span className='dashboard_icon'><HiBookOpen /></span>
            <span className='dashboard_text'>Investments</span>
            <span className='dashboard_arrow'><HiChevronRight /></span>
        </Link>
        
        <Link to='/users' className='dashboard_element'>
            <span className='dashboard_icon'><AiOutlineUser /></span>
            <span className='dashboard_text'>Accounts</span>
            <span className='dashboard_arrow'><HiChevronRight /></span>
        </Link>
        
        <div className='dashboard_element'>
            <span className='dashboard_icon'><BiSolidServer /></span>
            <span className='dashboard_text'>General</span>
            <span className='dashboard_arrow'><HiChevronRight /></span>
        </div>
        
        <Link to='/organizations' className='dashboard_element'>
            <span className='dashboard_icon'><GiBookshelf /></span>
            <span className='dashboard_text'>Organizations</span>
        </Link>
        
        <div className='dashboard_element'>
            <span className='dashboard_icon'><RxDownload /></span>
            <span className='dashboard_text'>Requests</span>
            <span className='dashboard_arrow'><HiChevronRight /></span>
        </div>
       
        <div className='dashboard_element'>
            <span className='dashboard_icon'><AiOutlineMessage /></span>
            <span className='dashboard_text'>Messages</span>
            <span className='dashboard_arrow'><HiChevronRight /></span>
        </div>

        <div className='dashboard_under_elements'>
            <div className='dashboard_element'>
                <span className='dashboard_icon'><IoSettingsOutline /></span>
                <span className='dashboard_text'>Settings</span>
            </div>
            <div onClick={handleRemoveAuthModal} className='dashboard_element dashboard_logout'>
                <span className='dashboard_icon'><RxExit /></span>
                <span className='dashboard_text'>Log out</span>
            </div>

        </div>


    </aside>
  )
}

export default Sidebar