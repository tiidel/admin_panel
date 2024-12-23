import React, { useEffect, useState } from 'react'
import './authenticate.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleButton from './OAuth/GoogleButton'
import FacebookButton from './OAuth/FaceBookButton'
import LinkedInButton from './OAuth/LinkedInButton'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../lib/UseLocalStorage'
import UseCookie from '../lib/UseCookie'
import { ReactComponent as Loader } from '../assets/loader.svg'
import { getRequest, postRequest, postTenant } from '../Resquest'

export const ForgotPasswordEmailForm = () => {
        const [isloading, setIsloading] = useState(false)
        const [formInputAlert, setFormInputAlert] = useState('')
        const [tenants, setTenants] = useState([])
        const [school, setSchool] = useState('')
        const [requestSuccess, setRequestSuccess] = useState(false)
        const [email, setEmail] = useState('')

        const navigate = useNavigate()

        const submitForm = (e) => {
            e.preventDefault()
            setIsloading(true)
            requestPasswordReset()
            // navigate('/reset_link_info')
        }
        const requestPasswordReset = async() => {
                let res;
                if( school === ""){
                        res = await postRequest('/auth/request-password-reset/', {"email": email})
                        console.log(res)
                }
                else {
                        res = await postTenant(school, `/auth/request-password-reset/`, {"email": email})
                }
                if(res?.status === 200) {
                        setIsloading(false)
                        setFormInputAlert('Password reset link has been sent to your email')
                        setRequestSuccess(true)
                        setTimeout(() => {
                                navigate('/reset-password')
                        }, 2000);
                } else {
                        setRequestSuccess(false)
                        alert()
                }
            console.log(res);
        }
        const alert = () => {
            setFormInputAlert('User with provided email does not exist')
            setIsloading(false)
        }

        useEffect(() => {
                fetch_tenants()
        }, [])

        const fetch_tenants = async() => {
                const res = await getRequest('/tenants/')
                res?.status === 202 && setTenants(res?.data)
        }
        
        
  return (
                <div className='authenticate'>
                        <div className='authenticate_form auth_info'>
                                { isloading && <div className='line_loading' /> }
                                <div className='company_name'> secured by tiidel</div>
                                <div className='logo auth_logo'>Tiidel Management</div>
                                <h2 className='title'>Forgot password</h2>
                                <p>To continue to Tiidel</p>
                                <form onSubmit={submitForm} className='form_content'>
                                        {
                                                formInputAlert.length > 1 && (
                                                        <div className={`nameWrapper ${ requestSuccess ? 'success': 'failed' }`}>
                                                                <input value= {formInputAlert} disabled className='auth_input input_alert' />
                                                        </div>
                                                )
                                        }
                                        <div className='nameWrapper'>
                                                <select className='auth_input' value={school} onChange={e => setSchool(e.target.value)}>
                                                        <option value="">--- Select school ---</option>
                                                        {
                                                        tenants.length > 0 &&
                                                        tenants.map(tenant => (
                                                                <>
                                                                { tenant.tenant.schema_name !== "public" && <option key={tenant.id} value={tenant.tenant.schema_name}>{tenant.tenant.name}</option> }
                                                                </>
                                                        ))
                                                        }
                                                </select>
                                        </div>
                                        <div className='nameWrapper'>
                                                <input value={email} placeholder='Email' required onChange={e => setEmail(e.target.value)} type='email' name='email' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <button type='submit' className='auth_input auth_submit_btn'>
                                                        <span className='btn_text'>Send email</span>
                                                        { isloading && <span className='btn_svg'><Loader /></span> }
                                                        
                                                </button>
                                        </div>
                                </form>
                        </div>
                        <div className='copyright_text'>@copyright 2024 Tiidel</div>
                </div>
  )
}