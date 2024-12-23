import React, { useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getRequest } from '../Resquest'
import { useNavigate } from 'react-router-dom'
import { IoMdCheckmark } from 'react-icons/io'

import { ReactComponent as Loader } from '../assets/LoaderOval.svg'
import { VscClose } from 'react-icons/vsc'

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

export const VerifyEmail = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const location = window.location
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5);

    useLayoutEffect(() => {
        setIsLoading(true)
        confirmEmail()
    }, [])
    
    const confirmEmail = async() => {
        console.log("you are searching", location?.search);
        const res = await getRequest(`/auth/verify-email/${location?.search}`)
        setIsLoading(false)
        console.log(res);
        if(res?.status === 200){
          go_to_login()
          setEmailVerified(true)
        }
        else {
          setEmailVerified(false)
        }
    }

    const go_to_login = () => {
      count_down()
      setTimeout(() => {
        navigate('/login')
      }, 5500);
    }

    const count_down = () => {
      setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 2000);
    }
    
  return (
    <div className='verify_user_email_page'>
      {
        isLoading ? <Load />
        :
        emailVerified ?

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
            <h1 className='title'>Your account has been verified</h1>
            <p>Proceeding to login in <span className='count_down_verify_email'>{ countdown }</span></p>
          </div>
      </div>
        :
      <div className='authenticate'>
          <div className='authenticate_form auth_info'>
              <div className='check_mark_valid_wrapper'>
              <motion.div
                      className='check_mark_valid failed'
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                  >
                  <motion.div
                          className='check_mark_inner failed'
                          variants={variants}
                          initial="visible"
                          animate="visible"
                      >
                          <span className='check_mark_icon'><VscClose /> </span>
                  </motion.div>
                  </motion.div>
              </div>
              <h1 className='title'>Something wrong with verification code</h1>
              <p>Unable to process your account verification</p>
            </div>
        </div>
        }
    </div>
  )
}

const Load = () => {
  return (
    <div className='verifying_email_user_loading'>
        <Loader />
    </div>
  )
}
