import React, { useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getRequest } from '../Resquest'
import { useNavigate } from 'react-router-dom'
import { IoMdCheckmark } from 'react-icons/io'

import { ReactComponent as Loader } from '../assets/LoaderOval.svg'

const variants = {
  hidden: {
      opacity: 0,
      transition: {
          duration: 0.1,
          type: "spring",
          damping: 25,
          stiffness: 500,
      }
  },
  visible: {
      opacity: 1,
      scale: [ 0, 1.5],
      transition: {
          duration: .1,
          type: "spring",
          damping: 25,
          stiffness: 500,
      }
  }
}

export const Invitation = () => {
    const location = window.location
    const navigate = useNavigate()

    useLayoutEffect(() => {
        invitation_details()
    }, [])
    
    const invitation_details = async() => {
        console.log("you are searching", location?.search);
        
    }

  return (
    <div className='verify_user_email_page'>
      accpet invitation
    </div>
  )
}

