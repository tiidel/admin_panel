import React from 'react'
import { useNavigate } from 'react-router'

export const UserList = ({ user }) => {

    const navigate = useNavigate()

  return (
    <tr onClick={() => navigate('/user/' + user?.first_name)} className='list_item'>
        <td className=''>{ user?.first_name } { user?.last_name }</td>
        <td className=''>{ user?.email }</td>
        <td className=''>{ user?.phone }</td>
        <td className=''>{ user?.company || 'None' }</td>
        <td className=''>{ new Date(user?.last_login).toLocaleString() || 'None'  }</td>
        <td className=''>{ user?.address_one || 'None' }</td>
        <td className=''>{ user?.country || 'None' }</td>
    </tr>
  )
}
