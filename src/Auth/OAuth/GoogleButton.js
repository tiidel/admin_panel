import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import googleLogo from './googleLogo.png';

const GoogleButton = () => {
  const responseGoogle = (response) => {
    console.log('Google response:', response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={(error) => console.log('Login Failed:', error)}
      render={renderProps => (
        <div 
          className='authBtn google'
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img
            src={googleLogo}
            alt="Sign in with Google"
            className='oauthBtnImg'
          />
          <div className='login_btn_text'>Sign in with Google</div>
        </div>
      )}
    />
  );
};

export default GoogleButton;