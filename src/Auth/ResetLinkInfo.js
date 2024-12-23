import React, { useEffect, useState } from 'react'
import './authenticate.css'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosInformationCircleOutline } from 'react-icons/io'

export const ResetLinkInfo = () => {
        const navigate = useNavigate()
        

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
        
  return (
        <div className='authenticate'>
                <div className='authenticate_form auth_info'>
                    <div className='check_mark_valid_wrapper'>
                    <motion.div
                            className='check_mark_valid resetInfo'
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                        >
                        <motion.div
                                className='check_mark_inner resetInfo'
                                variants={variants}
                                initial="visible"
                                animate="visible"
                            >
                                <span className='check_mark_icon'><IoIosInformationCircleOutline /> </span>
                        </motion.div>
                        </motion.div>
                    </div>
                    <h1 className='title'>Request sent successfully</h1>
                    <p>Check your email for information on how to proceed</p>
                    <p>we sugest you look in your spam mails if you didn't receive</p>
                    <br />
                    <Link style={{ color: "blue", textDecoration: 'underline'}} to='/forgot-password'>resend link</Link>
                </div>
        </div>
  )
}
