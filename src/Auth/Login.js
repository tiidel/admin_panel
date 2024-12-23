import React, { useEffect, useState } from 'react'
import './authenticate.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleButton from './OAuth/GoogleButton'
import FacebookButton from './OAuth/FaceBookButton'
import LinkedInButton from './OAuth/LinkedInButton'
import { Link, useNavigate } from 'react-router-dom'
import UseCookie from '../lib/UseCookie'
// import { ReactComponent as Loader } from '../assets/loader.svg'

import Cookies from 'universal-cookie'
import { auth } from '../api/api'


export const Login = () => {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [isloading, setIsloading] = useState(false)
        const [formInputAlert, setFormInputAlert] = useState('')

        const [user, setUser] = UseCookie('user')

        useEffect(() => {
          if(user?.user) {
                clearLoginData()
          }
          
        }, [])

        const clearLoginData = () => {
                const cookies = new Cookies().remove('user')
                localStorage.clear();
                window.location.reload()
        }

        
        const userData = {
                "password": password,
                "email_or_phone": email
        }
        
        const submitForm = (e) => {
                e.preventDefault()
                if(isloading) return
                setIsloading(true)
                makeRequest()
        }

        const makeRequest = async() => {
                let res;
                res = await auth('/auth/login/', userData)
                console.log('remote request', res)
               
                if(res?.status === 200){
                        setUser(res?.data)
                        window.location.href = '/'
                }
                if(res?.response?.status === 401){
                        alertForm('We cannot perform this action at the moment, please try again later')
                }
                if(res?.response?.status === 400){
                        alertForm('invalid credentials')
                }
                setIsloading(false)
        }

        const alertForm = (msg) => {
                setFormInputAlert(msg)
                setIsloading(false)
                setTimeout(() => {
                        setFormInputAlert('')
                }, 3000);
        }

        
  return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <div className='authenticate'>
                        <div className='authenticate_form'>
                                { isloading && <div className='line_loading' /> }
                                <div className='company_name'> secured by tiidel</div>
                                <div className='logo auth_logo'>Tiidel Management</div>
                                <h2 className='title'>Sign In</h2>
                                <p>To continue to Tiidel</p>
                                <form onSubmit={submitForm} className='form_content'>
                                        {
                                                formInputAlert.length > 1 && (
                                                        <div className='nameWrapper'>
                                                                <input value= {formInputAlert} disabled className='auth_input input_alert' />
                                                        </div>
                                                )
                                        }
                                        <div className='nameWrapper'>
                                                <label htmlFor='email' className='input_label'>Email</label>
                                                <input value={email} onChange={e => setEmail(e.target.value)} type='email' name='email' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <label htmlFor='password' className='input_label'>Password</label>
                                                <input  value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <button type='submit' className='auth_input auth_submit_btn'>
                                                        <span className='btn_text'>Login</span>
                                                        {/* { isloading && <span className='btn_svg'><Loader /></span> } */}
                                                        
                                                </button>
                                        </div>
                                        <Link to='/forgot-password'>forgot password?</Link>
                                </form>
                                <div className="buttonWrapper signupBtn">
                                        <p className="or">OR</p>
                                        <div className='other_autheticate'>
                                                <GoogleButton />
                                                <FacebookButton  />
                                                <LinkedInButton />
                                        </div>
                                </div>
                                <div className='pre_auth'>
                                        <p className='switch_auth_method'>Don't have an account? <Link to='/register'>Sign Up</Link></p>
                                        <div className='auth_policies'>
                                                <Link to='/help'>Help.</Link>
                                                <Link to='/policies'>Privacy</Link>
                                                <Link to='/terms'>Terms</Link>
                                        </div>
                                </div>
                        </div>
                        <div className='copyright_text'>@copyright 2024 Tiidel</div>
                </div>
        </GoogleOAuthProvider>
  )
}
