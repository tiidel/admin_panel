import React, { useEffect, useState } from 'react'
import './authenticate.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import GoogleButton from './OAuth/GoogleButton'
import FacebookButton from './OAuth/FaceBookButton'
import LinkedInButton from './OAuth/LinkedInButton'


import { ReactComponent as Loader } from '../assets/loader.svg'
import { postRequest, postTenant } from '../Resquest'



export const InvitationRequest = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formInputAlert, setFormInputAlert] = useState('')
    const [isloading, setIsloading] = useState(false)
    const [invite_code, setInvite_code] = useState('')
    const [invite_tenant, setInvite_tenant] = useState('')
        
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const school = searchParams.get('school');
        const code = searchParams.get('code');
        
        setInvite_code(code)
        setInvite_tenant(school)

      }, [location.search]);
      

    const userData = {
        "first_name": firstName,
        "last_name": lastName,
        "password": password,
        "username": email,
        "email": email
    }

    const submitForm = (e) => {
        e.preventDefault()
        setIsloading(true)
        submitData()
    }

    const submitData = async() => {
            
        if(firstName.trim().length < 2 || lastName.trim().length < 2) {
            return alertForm("Invalid name")
        }

        if(password.length < 5) {
            return alertForm("Passwords must be at least 8 characters")
        }

        if(password !== confirmPassword) {
            return alertForm("Passwords must be the same")
        }

        const res = await postTenant(invite_tenant, `/invitation/${invite_code}/`, userData)
        if(res.status === 201){
            navigate('/info_createaccount')
        }
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
                                <h2 className='title'>Create an account</h2>
                                <p>To start to Tiidel</p>
                                <form onSubmit={submitForm} className='form_content'>
                                        {
                                                formInputAlert.length > 1 && (
                                                        <div className='nameWrapper'>
                                                                <input value= {formInputAlert} disabled className='auth_input input_alert' />
                                                        </div>
                                                )
                                        }
                                        <div className='nameWrapper inputflex'>
                                                <div className='sides'>
                                                        <label htmlFor='fname' className='input_label'>First Name</label>
                                                        <input value={firstName} onChange={e => setFirstName(e.target.value)} type='text' name='fname' className='auth_input' />
                                                </div>
                                                <div className='sides'>
                                                        <label htmlFor='lname' className='input_label'>Last Name</label>
                                                        <input value={lastName} onChange={e => setLastName(e.target.value)} type='text' name='lname' className='auth_input' />
                                                </div>
                                        </div>
                                        <div className='nameWrapper'>
                                                <label htmlFor='email' className='input_label'>Email</label>
                                                <input value={email} onChange={e => setEmail(e.target.value)} type='email' name='email' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <label htmlFor='password' className='input_label'>Password</label>
                                                <input  value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <label htmlFor='password' className='input_label'>Confirm Password</label>
                                                <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type='password' name='password' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <button type='submit' className='auth_input auth_submit_btn'>
                                                        <span className='btn_text'>Sign Up</span>
                                                        { isloading && <span className='btn_svg'><Loader /></span> }
                                                        
                                                </button>
                                        </div>
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
                                        <p className='switch_auth_method'>Have an account? <Link to='/login'>Sign In</Link></p>
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
