import React, { useState } from 'react'
import './authenticate.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Loader } from '../assets/loader.svg'
import { postRequest, postTenant } from '../Resquest'

export const ResetPassword = () => {
        const [confirmPassword, setConfirmPassword] = useState('')
        const [password, setPassword] = useState('')
        const [isloading, setIsloading] = useState(false)
        const [formInputAlert, setFormInputAlert] = useState('')


        const navigate = useNavigate()
        const location = useLocation()

        const queryParams = new URLSearchParams(location.search);
        const school = queryParams.get('school');
        const uid = queryParams.get('uid');
        const token = queryParams.get('token');

        const userData = {
                "password": password,
        }
        const submitForm = (e) => {
                e.preventDefault()
                setIsloading(true)
                makeRequest()
        }

        const makeRequest = async() => {
                if(isloading) return
                if(password.length < 5) {
                        return alertForm("Passwords must be at least 8 characters")
                }
                if(password !== confirmPassword) {
                        return alertForm("Passwords must be the same")
                }
                let server_response;
                if(school === 'public' || !school){
                        server_response = await postRequest(`/auth/reset-password?uid=${uid}&token=${token}`, userData)
                }
                else {
                        server_response = await postTenant(school, `/auth/reset-password?uid=${uid}&token=${token}`, userData)
                }
                console.log(server_response)

                if(server_response.status === 200) {
                        setFormInputAlert('Password reset successful')
                        setTimeout(() => {
                                navigate('/login')
                        }, 2000);
                        setIsloading(false)
                } else {
                        setIsloading(false)
                        setFormInputAlert(server_response?.message)
                        setTimeout(() => {
                                setFormInputAlert('')
                        }, 3000);
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
                <div className='authenticate'>
                        <div className='authenticate_form'>
                                { isloading && <div className='line_loading' /> }
                                <div className='company_name'> secured by tiidel</div>
                                <div className='logo auth_logo'>Tiidel Management</div>
                                <h2 className='title'>Reset password</h2>
                                <form onSubmit={submitForm} className='form_content'>
                                        {
                                                formInputAlert.length > 1 && (
                                                        <div className='nameWrapper'>
                                                                <input value= {formInputAlert} disabled className='auth_input input_alert' />
                                                        </div>
                                                )
                                        }
                                        <div className='nameWrapper'>
                                                <label htmlFor='password' className='input_label'>New password</label>
                                                <input value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <label htmlFor='c_password' className='input_label'>Confirm Password</label>
                                                <input  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type='password' name='c_password' className='auth_input' />
                                        </div>
                                        <div className='nameWrapper'>
                                                <button type='submit' className='auth_input auth_submit_btn'>
                                                        <span className='btn_text'>Reset password</span>
                                                        { isloading && <span className='btn_svg'><Loader /></span> }
                                                        
                                                </button>
                                        </div>
                                </form>
                                <br />
                                <div className='pre_auth'>
                                        <p className='switch_auth_method'>Remembered password? <Link to='/login'>Login</Link></p>
                                        <div className='auth_policies'>
                                                <Link to='/help'>Help.</Link>
                                                <Link to='/policies'>Privacy</Link>
                                                <Link to='/terms'>Terms</Link>
                                        </div>
                                </div>
                        </div>
                </div>
  )
}

