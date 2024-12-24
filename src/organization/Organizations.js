import React, { useEffect, useLayoutEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";


// import { getRequest } from '../../../api/Request'
import { ReactComponent as CircularLoader } from '../assets/svg/CircularLoader.svg'
import { getRequest } from '../api/api';
import { ListContent } from './ListContent';

const Organizations = () => {
    const [showfilter, setShowfilter] = useState(false)
    const [isloading, setIsloading] = useState(true)
    const [organizations, setOrganizations] = useState([])

    const location = useLocation()
    
   

    useEffect(() => {
      fetch_users()
    }, [])


    const fetch_users = async () => {
        setIsloading(true)
        let response = await getRequest('/organizations/')
        console.log('organizations', response);
        
        if(response.status === 200) {
            setOrganizations(response.data)
        }
        setIsloading(false)
    }
    

   
    const filter = (filter_param) => {

    }

  return (
    <>
        <nav className='navbar nav_adders'>
            <div className='nav_left'>
                <Link to ='' className='nav_link route_path'>Organization List</Link>
                <Link to='' className='nav_link'>#all-orgs</Link>
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

        <table className=''>
            <thead>
                <tr className='list_item'>
                    <th className='list_row'>Name</th>
                    <th className='list_row'>Head Quaters</th>
                    <th className='list_row'>Industry</th>
                    <th className='list_row'>Is Public</th>
                    <th className='list_row'>Is Traded</th>
                    <th className='list_row'>Type</th>
                    <th className='list_row'>Reg. No.</th>
                    <th className='list_row'>Reg. Date</th>
                    <th className='list_row'>Fund Stage</th>
                    <th className='list_row'>Verification</th>
                </tr>
            </thead>
                {
                    isloading ?
                        <div className='fetching_loader'><CircularLoader /></div>
                    :
                    <tbody>
                        {
                            organizations.map(organization => (
                                <ListContent organization={organization} />
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

export default Organizations