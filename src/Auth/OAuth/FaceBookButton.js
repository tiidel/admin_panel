import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import facebook from './facebookLogo.png'

const FacebookButton = ({text}) => {
    const responseFacebook = (res)=>{
      console.log('facebook response');
        console.log(res);
    }
  return (
    <div>
        <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
        autoLoad={false}
        fields="id,name,email,picture,first_name,last_name,gender,locale,timezone,verified"
        callback={responseFacebook}
        render={renderProps => (
          <div className='authBtn facebook'>
            <img
              onClick={renderProps.onClick} 
              src={facebook}
              alt="Sign in with facebook"
              className='oauthBtnImg'
            />
            <div className='login_btn_text'>Sign in with Facebook</div>
          </div>
        )}
    />
    </div>
  )
}

export default FacebookButton