import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';

// 컴포넌트
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { SignInRequestDto } from '../../apis/request/auth';
import { signInRequest } from '../../apis/auth';
import { SignInResponseDto } from '../../apis/response/auth';
import { ResponseDto } from '../../apis/response';
import { useAppDispatch } from '../../hooks/store.hook';
import { selectUser, signIn } from '../../store/user-slice.store';
import { UserInfo } from '../../types/interface';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { SIGN_UP_PATH } from '../../constants';
import { useSelector } from 'react-redux';

export default function SignIn() {

  // 유저 로그인 정보 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<HTMLInputElement|null>(null);
  const signInRef = useRef<HTMLDivElement|null>(null);

  // 유저 로그인 정보 에러 상태
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  // 유저 로그인 에러 메세지 상태
  // const [emailErrorMessage, setEmailErrorMessage] = useState('');
  // const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 쿠키 상태
  const [cookies, setCookies] = useCookies();

  const user : UserInfo = useSelector(selectUser);

  const navigate = useNavigate();

  // 에러 상태 초기화 함수
  const errorInitialize = () => {
    setEmailError(false);
    setPasswordError(false);

    setErrorMessage('');

    return ;
  }

  // event 함수

  const onChangeEmailInputHandler = (event:ChangeEvent<HTMLInputElement>) => {

    const { value } = event.target;
    setEmail(value);
  }

  const onChangePasswordInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  }

  const onKeyDownEmailInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return ;
    if(!passwordRef.current) return ;
    passwordRef.current.focus();
  }

  const onKeyDownPasswordInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return ;
    if(!signInRef.current) return ;
    signInRef.current.click();
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

  // api response handler 함수

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
      const hour = 3600;
      const expires = new Date(Date.now() + (hour * 1000));
      const { token } = responseBody;
      setCookies('accessToken', token, { path : "/", expires: expires });

      navigate('/');
      return ;
    }
    
  }

  // effect
  useEffect(() => {
    if(cookies.accessToken || user.isLogin) {
      alert("잘못된 접근입니다.");
      navigate('/');
      return ;
    }
  }, []);


  // 렌더링 
  return (
    <div id='sign-in-wrapper'>
      <div className='sign-in-container'>
        <div className='sign-in-context-box'>
          <div className='sign-in-context-text michroma-regular'>{'minP'}</div>
          <div className='sign-in-context-text michroma-regular'>{'LOGIN'}</div>
        </div>
        <div className='sign-in-box'>
          <InputBox 
            label='이메일' 
            placeholder='이메일을 입력하세요.' 
            type='text' 
            value={email} 
            onChange={onChangeEmailInputHandler} 
            onKeyDown={onKeyDownEmailInputHandler}
            error={isEmailError} 
            message={errorMessage} 
          />
          <InputBox 
            ref={passwordRef}
            label='비밀번호' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={password} 
            onChange={onChangePasswordInputHandler} 
            onKeyDown={onKeyDownPasswordInputHandler}
            error={isPasswordError} 
            message={errorMessage} 
          />
          <div className='sign-in-button'>
            <Button ref={signInRef} text='LOGIN' size='wide' onClick={onClickSignInButtonHandler}/>
          </div>
          <div className='sign-in-sign-up-box'>
            <div className='sign-in-sign-up-text'>{'회원이 아니신가요?'}</div>
            <Button text='SIGN UP' size='wide' onClick={() => navigate(SIGN_UP_PATH())}/>
          </div>
        </div>
      </div>
    </div>
  )
}