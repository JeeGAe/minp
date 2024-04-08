import React, { useState } from 'react';
import './style.css';

// 컴포넌트
import InputBox from '../../components/InputBox';

// 다움 주소 찾기 api
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

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
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

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
            setValue={setEmail} 
            error={isEmailError} 
            message={emailErrorMessage} 
          />
          <InputBox 
            label='비밀번호*' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={password} 
            setValue={setPassword} 
            error={isPasswordError} 
            message={passwordErrorMessage} 
          />
          <InputBox 
            label='비밀번호 확인*' 
            placeholder='비밀번호를 입력하세요.' 
            type='text' 
            value={passwordCheck} 
            setValue={setPasswordCheck} 
            error={isPasswordCheckError} 
            message={passwordCheckErrorMessage} 
          />
          <InputBox 
            label='닉네임*' 
            placeholder='닉네임을 입력하세요.' 
            type='text' 
            value={nickname} 
            setValue={setNickname} 
            error={isNicknameError} 
            message={nicknameErrorMessage} 
          />
          <InputBox 
            label='연락처' 
            placeholder='연락처를 입력하세요.' 
            type='text' value={phoneNumber} 
            setValue={setPhoneNumber} 
            error={isPhoneNumberError} 
            message={phoneNumberErrorMessage} 
          />
          <InputBox 
            label='우편번호' 
            placeholder='우편번호를 입력하세요.' 
            type='text' 
            value={zipCode} 
            setValue={setZipCode} 
            error={isPhoneNumberError} 
            message={phoneNumberErrorMessage} 
            readOnly={true} 
            onClick={onClickAddressInputHandler} 
          />
          <InputBox 
            label='주소' 
            placeholder='주소를 입력하세요.' 
            type='text' 
            value={address} 
            setValue={setAddress} 
            error={isPhoneNumberError} 
            message={phoneNumberErrorMessage} 
            readOnly={true} 
            onClick={onClickAddressInputHandler} 
          />
          <InputBox 
            label='상세주소' 
            placeholder='상세주소를 입력하세요.' 
            type='text' 
            value={addressDetail} 
            setValue={setAddressDetail} 
            error={isPhoneNumberError} 
            message={phoneNumberErrorMessage} 
          />
        </div>
      </div>
    </div>
  )
}