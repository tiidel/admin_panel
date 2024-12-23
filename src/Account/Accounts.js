import React, { useLayoutEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";


// import { getRequest } from '../../../api/Request'
import { UserList } from './UserList'
import { ReactComponent as CircularLoader } from '../assets/svg/CircularLoader.svg'

const Accounts = () => {
    const [showfilter, setShowfilter] = useState(false)
    const [isloading, setIsloading] = useState(true)
    const [userList, setuserList] = useState([])

    const location = useLocation()
    
    // useLayoutEffect(() => {
	// 	fetchUsers()
	// }, [location]);

    // const fetchUsers = async () => {
	// 	setIsloading(true)
	// 	let response;
	// 	let category_id = location.state?.dir
	// 	if(location.search) {
    //         response = await getRequest(`/adegory_id}`)
    //     } 
    //     else {
    //         response = await getRequest('/admin/?limit=30')
    //     }

    //     console.log('user list', response);
	// 	response.status === 200 && saveData(response.data)
	// }

   
    const filter = (filter_param) => {

    }

  return (
    <>
        <nav className='navbar nav_adders'>
            <div className='nav_left'>
                <Link to ='' className='nav_link route_path'>Accounts</Link>
                <Link to='' className='nav_link'>#code</Link>
            </div>
            <div className='nav_right nav_filters'>
                <Link to ='' className='nav_link filter'>Today</Link> 
                <Link to ='' className='nav_link filter'>This week</Link> 
                <Link to ='' className='nav_link filter'>This Month</Link> 
            </div>
        </nav>

        <section className='filter_actions'>
            <div className='filter_by_dropdown'>
                <span className='filter_by' onClick={() => setShowfilter(!showfilter)}>Filter by <span className='icon'> <HiChevronDown /></span></span>
                {
                    showfilter && (
                    <div className='filter_by_dropdown_content'>
                        <p onClick={() => filter('active')} >active</p>
                        <p onClick={() => filter('waiting')} >waiting review</p>
                        <p onClick={() => filter('invisibile')} >Blocked accounts</p>
                        <p onClick={() => filter('deleted')} >recently deleted</p>
                    </div>
                    )
                }
            </div>
            <div className='search_filter'>
                <input type='text' placeholder='search...' />
            </div>
        </section>

        <table className='book_list'>
            <thead>
                <tr className='list_item'>
                    <th className='list_row'>Full Name</th>
                    <th className='list_row'>User email</th>
                    <th className='list_row'>Company</th>
                    <th className='list_row'>Account Active</th>
                    <th className='list_row'>Verification</th>
                    <th className='list_row'>Phone</th>
                    <th className='list_row'>Nationality</th>
                </tr>
            </thead>
                {
                    isloading ?
                        <div className='fetching_loader'><CircularLoader /></div>
                    :
                    <tbody>
                        {
                            userList.map(user => (
                                <UserList user={user} />
                            ))
                        }
                    </tbody>
                }
                
        </table>
        {
            !isloading && (
            <div className='list_controller'>
                <div className='prev_list list_control_btn'>
                <GrChapterPrevious />
                </div>
                <p>30 / 500</p>
                <div className='next_list list_control_btn'>
                    <GrChapterNext />
                </div>
            </div>
            )
        }
    </>
  )
}

export default Accounts