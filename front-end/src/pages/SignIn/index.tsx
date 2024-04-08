import React, { useState } from 'react';
import './style.css';

// 컴포넌트
import InputBox from '../../components/InputBox';

export default function SignIn() {

  // 유저 가입 정보 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 유저 가입 정보 에러 상태
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  // 유저 가입 정보 에레 메세지 상태
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


  // 렌더링 
  return (
    <div id='sign-in-wrapper'>
      <div className='sign-in-container'>
        <div className='sign-in-context-box'>
          <div className='sign-in-context-text michroma-regular'>{'로그인'}</div>
        </div>
        <div className='sign-in-card'>
          <InputBox 
            label='이메일' 
            placeholder='이메일을 입력하세요.' 
            type='text' 
            value={email} 
            setValue={setEmail} 
            error={isEmailError} 
            message={emailErrorMessage} 
          />
          <InputBox 
            label='비밀번호' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={password} 
            setValue={setPassword} 
            error={isPasswordError} 
            message={passwordErrorMessage} 
          />
        </div>
      </div>
    </div>
  )
}