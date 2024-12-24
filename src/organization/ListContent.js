import React from 'react'
import { useNavigate } from 'react-router'

export const ListContent = ({ organization }) => {

    const navigate = useNavigate()
    const date = new Date((organization?.listing_date));
    const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

  return (
    <tr onClick={() => navigate('/organization/' + organization?.id)} className='list_item'>
        <td className=''>{ organization?.name }</td>
        <td className=''>{ organization?.headquarters }</td>
        <td className=''>{ organization?.industry }</td>
        <td className=''>{ organization?.is_public }</td>
        <td className=''>{ organization?.is_traded }</td>
        <td className=''>{ organization?.organization_type || 'None' }</td>
        <td className=''>{ organization?.address_one || 'None' }</td>
        <td className=''>{ formattedDate || 'None'  }</td>
        <td className=''>{ organization?.registration_number || 'None' }</td>
        <td className=''>{ organization?.verification_status || 'None' }</td>
    </tr>
  )
}
