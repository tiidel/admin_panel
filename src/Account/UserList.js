import React from 'react'
import { useNavigate } from 'react-router'

export const UserList = ({ user }) => {

    const navigate = useNavigate()

  return (
    <tr onClick={() => navigate('/books/' + user?.first_name)} className='list_item'>
        <td className='book_name'>{ user?.first_name } { user?.last_name }</td>
        <td className='gray_book_atr'>{ user?.email }</td>
        <td className='book_name'>{ user?.is_staff ? 'True' : 'False' }</td>
        <td className='gray_book_atr'>{ user?.is_active ? 'True' : 'False'}</td>
        <td className='book_name'>{ user?.seller_ebook_shop_url || 'None' }</td>
        <td className='gray_book_atr'>{ user?.profile?.main_phone_number || 'None' }</td>
        <td className='gray_book_atr'>{ user?.profile?.country__name || 'None' }</td>
    </tr>
  )
}
