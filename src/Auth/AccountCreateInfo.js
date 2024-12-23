import React, { useEffect, useState } from 'react'
import './authenticate.css'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdCheckmark } from 'react-icons/io'

export const AccountCreateInfo = () => {
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
                            className='check_mark_valid'
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                        >
                        <motion.div
                                className='check_mark_inner'
                                variants={variants}
                                initial="visible"
                                animate="visible"
                            >
                                <span className='check_mark_icon'><IoMdCheckmark /> </span>
                        </motion.div>
                        </motion.div>
                    </div>
                    <h1 className='title'>Account Created successfully</h1>
                    <p>Verify your email address to proceed</p>
                </div>
        </div>
  )
}
