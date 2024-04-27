import React, { useState } from 'react';
import './style.css';

// 컴포넌트
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { SignInRequestDto } from '../../apis/request/auth';
import { signInRequest } from '../../apis/auth';
import { SignInResponseDto } from '../../apis/response/auth';
import { ResponseDto } from '../../apis/response';
import { useAppDispatch } from '../../hooks/store.hook';
import { signIn } from '../../store/user-slice.store';
import { UserInfo } from '../../types/interface';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function SignIn() {

  // 유저 로그인 정보 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 유저 로그인 정보 에러 상태
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  // 유저 로그인 에러 메세지 상태
  // const [emailErrorMessage, setEmailErrorMessage] = useState('');
  // const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 쿠키 상태
  const [cookies, setCookies] = useCookies();

  const navigate = useNavigate();

  // 에러 상태 초기화 함수
  const errorInitialize = () => {
    setEmailError(false);
    setPasswordError(false);

    setErrorMessage('');

    return ;
  }

  const signInResponseHandler = (responseBody : SignInResponseDto | ResponseDto | null ) => {
    if(!responseBody) {
      alert("죄송합니다. 다시 시도해주세요!");
      return ;
    }

    const { code } = responseBody;
    if(code === 'VF' || code === 'SF') {
      setPasswordError(true);
      setErrorMessage('계정을 다시 확인해 주세요!');
      return ;
    }
    if(code === 'IE') {
      alert("서버 에러입니다. 다시 시도해주세요!");
      return ;
    }
    if(code === 'SU' && 'token' in responseBody) {
      const { token } = responseBody;
      setCookies('accessToken', token);

      navigate('/');
      return ;
    }
    
  }

  const onClickSignInButtonHandler = () => {
    errorInitialize();

    if(email.trim() === '') {
      setEmailError(true);
      setErrorMessage('이메일을 입력해주세요!');
      return ;
    }
    if(password.trim() === '') {
      setPasswordError(true);
      setErrorMessage('비밀번호를 입력해주세요!');
      return ;
    }

    const requestBody : SignInRequestDto = { email, password };

    signInRequest(requestBody)
    .then(signInResponseHandler)

  }


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
            message={errorMessage} 
          />
          <InputBox 
            label='비밀번호' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={password} 
            setValue={setPassword} 
            error={isPasswordError} 
            message={errorMessage} 
          />
          <Button text='로그인' size='wide' onClick={onClickSignInButtonHandler}/>
        </div>
      </div>
    </div>
  )
}