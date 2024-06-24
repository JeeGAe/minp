import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './style.css';

// 컴포넌트
import InputBox from '../../components/InputBox';

// 다움 주소 찾기 api
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import Button from '../../components/Button';
import { SignUpRequestDto } from '../../apis/request/auth';
import { signUpRequest } from '../../apis/auth';
import { SignUpResponseDto } from '../../apis/response/auth';
import { ResponseDto } from '../../apis/response';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserInfo } from '../../types/interface';
import { useAppSelector } from '../../hooks';
import { selectUser } from '../../store/user-slice.store';

export default function SignUp() {

  // 유저 가입 정보 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  // 유저 가입 정보 에러 상태
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isPasswordCheckError, setPasswordCheckError] = useState(false);
  const [isNicknameError, setNicknameError] = useState(false);
  const [isPhoneNumberError, setPhoneNumberError] = useState(false);

  // 유저 가입 정보 에러 메세지 상태
  // const [emailErrorMessage, setEmailErrorMessage] = useState('');
  // const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  // const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState('');
  // const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  // const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(['accessToken']);

  const user : UserInfo = useAppSelector(selectUser);

  // 에러 상태 초기화 함수
  const errorInitialize = () => {
    setEmailError(false);
    setPasswordError(false);
    setPasswordCheckError(false);
    setNicknameError(false);
    setPhoneNumberError(false);

    setErrorMessage('');

    return ;
  }

  // 다음 주소 찾기 api
  const openUseDaumPostcodePopup = useDaumPostcodePopup();

  const onClickAddressInputHandler = () => {
    openUseDaumPostcodePopup({ top : 200, left : 500, onComplete : onCompleteDaumPostcodePopupHandler });
  }

  const onCompleteDaumPostcodePopupHandler = (data : Address) => {
    const { address, zonecode } = data;
    setZipCode(zonecode);
    setAddress(address);
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

  const onChangePasswordCheckInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);
  }

  const onChangeNicknameCheckInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickname(value);
  }

  const onChangePhoneNumberCheckInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPhoneNumber(value);
  }

  const onChangeAddressDetailCheckInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAddressDetail(value);
  }

  const onKeyDownPhoneNumberInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter' && event.key !== 'Tab') return ;
    openUseDaumPostcodePopup({ top : 200, left : 500, onComplete : onCompleteDaumPostcodePopupHandler });
  }

  const onClickSignUpButtonHandler = () => {
    // 에러 관련 초기화
    errorInitialize();
    const emailRegex = new RegExp('[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d!@#$%^&*_]{8,20}$');
    const nicknameRegex = new RegExp('[a-zA-z\d가-힣]{3,10}');

    if(email.trim() === '' || email.includes(' ') || !emailRegex.test(email)) {
      setEmailError(true);
      setErrorMessage('이메일을 형식에 맞게 적어주십시오!');
      return ;
    }
    if(password.trim() === '' || password.includes(' ') || !passwordRegex.test(password)) {
      setPasswordError(true);
      setErrorMessage('비밀번호를 8자리 이상 20자리 이하로 만들어주세요!(허용특수문자:!@#$%^&*_)');
      return ;
    }
    if(password.trim() !== passwordCheck.trim()) {
      setPasswordCheckError(true);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return ;
    }
    if(nickname.trim() === '' || nickname.includes(' ') || !nicknameRegex.test(nickname)) {
      setNicknameError(true);
      setErrorMessage('닉네임을 3자리이상 10자리 이하로 적어주십시오!(특수문자X)');
      return ;
    }

    const requestBody : SignUpRequestDto = { email, password, nickname,
       phoneNumber, zipCode, address, addressDetail };
    
    signUpRequest(requestBody)
    .then(signUpResponseHandler)

  }

  // api response 함수

  const signUpResponseHandler = (responseBody : SignUpResponseDto | ResponseDto | null) => {
    if(!responseBody) {
      alert("죄송합니다. 다시 시도해주십시오.");
      return ;
    }

    const { code } = responseBody;
    if(code === 'DE') {
      setEmailError(true);
      setErrorMessage('이미 사용중인 이메일 입니다.');
      return ;
    }
    if(code === 'DN') {
      setNicknameError(true);
      setErrorMessage('이미 사용중인 닉네임 입니다.');
      return ;
    }
    if(code === 'DP') {
      setPhoneNumberError(true);
      setErrorMessage('이미 사용중인 번호입니다.');
      return ;
    }
    if(code === 'VF') {
      alert('입력 정보를 확인해주세요!');
      return ;
    }
    if(code === 'IE') {
      alert('서버에 문제가 있습니다.');
      return ;
    }
    if(code === 'SU') {
      alert("가입되었습니다!");
      navigate("/");
    }

  }

  // effect
  useEffect(() => {
    if(cookies.accessToken || user.isLogin) {
      alert("비정상적인 접근입니다.");
      navigate('/');
    }
  }, []);

  // 렌더링 
  return (
    <div id='sign-up-wrapper'>
      <div className='sign-up-container'>
        <div className='sign-up-context-box'>
          <div className='sign-up-context-text michroma-regular'>{'Create'}</div>
          <div className='sign-up-context-text michroma-regular'>{'new'}</div>
          <div className='sign-up-context-text michroma-regular'>{'account!'}</div>
        </div>
        <div className='sign-up-card'>
          <InputBox 
            label='이메일*' 
            placeholder='이메일을 입력하세요.' 
            type='text' 
            value={email} 
            onChange={onChangeEmailInputHandler} 
            error={isEmailError} 
            message={errorMessage} 
          />
          <InputBox 
            label='비밀번호*' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={password} 
            onChange={onChangePasswordInputHandler} 
            error={isPasswordError} 
            message={errorMessage} 
          />
          <InputBox 
            label='비밀번호 확인*' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={passwordCheck} 
            onChange={onChangePasswordCheckInputHandler} 
            error={isPasswordCheckError} 
            message={errorMessage} 
          />
          <InputBox 
            label='닉네임*' 
            placeholder='닉네임을 입력하세요.' 
            type='text' 
            value={nickname} 
            onChange={onChangeNicknameCheckInputHandler} 
            error={isNicknameError} 
            message={errorMessage} 
          />
          <InputBox 
            label='연락처*' 
            placeholder='연락처를 입력하세요.' 
            type='text' value={phoneNumber} 
            onChange={onChangePhoneNumberCheckInputHandler} 
            onKeyDown={onKeyDownPhoneNumberInputHandler}
            error={isPhoneNumberError} 
            message={errorMessage} 
          />
          <InputBox 
            label='우편번호*' 
            placeholder='우편번호를 입력하세요.' 
            type='text' 
            value={zipCode} 
            readOnly={true} 
            onClick={onClickAddressInputHandler} 
          />
          <InputBox 
            label='주소*' 
            placeholder='주소를 입력하세요.' 
            type='text' 
            value={address} 
            readOnly={true} 
            onClick={onClickAddressInputHandler} 
          />
          <InputBox 
            label='상세주소' 
            placeholder='상세주소를 입력하세요.' 
            type='text' 
            value={addressDetail} 
            onChange={onChangeAddressDetailCheckInputHandler} 
          />
          <div className='sign-up-button-box'>
            <Button text='회원가입' size='wide' onClick={onClickSignUpButtonHandler}/>
          </div>
        </div>
      </div>
    </div>
  )
}