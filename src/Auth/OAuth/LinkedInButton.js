import React from 'react'
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedInImage from './linkedin-logo-png-1837.png'
const LinkedInButton = () => {
    const { linkedInLogin } = useLinkedIn({
        clientId: '86vhj2q7ukf83q',
        redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
          console.log(code);
        },
        onError: (error) => {
          console.log(error);
        },
      });

  return (
    <div className='authBtn linkedin'>
            {/* <img
              onClick={renderProps.onClick} 
              src={facebook}
              alt="Sign in with facebook"
              className='oauthBtnImg'
            /> */}
            <img
              onClick={linkedInLogin}
              src={linkedInImage}
              alt="Sign in with Linked In"
            //   style={{ maxWidth: '180px', cursor: 'pointer' }}
              className='oauthBtnImg'
            />
            <div className='login_btn_text'>Sign in with LinkedIn</div>
          </div>
  )
}

export default LinkedInButton