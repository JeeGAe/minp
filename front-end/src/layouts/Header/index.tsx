import './style.css';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserInfo } from '../../types/interface';
import { SIGN_IN_PATH } from '../../constants';


import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { signIn, signOut } from '../../store/user-slice.store';

import { getSignInUserRequest } from '../../apis/user';
import { GetSignInUserResponseDto } from '../../apis/response/user';
import { ResponseDto } from '../../apis/response';

// component
import Button from '../../components/Button';


export default function Header() {
  // react-redux 스토어
  const user : UserInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // 쿠키 상태
  const [cookies, setCookies] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const getSignInResponseHandler = (responseBody : GetSignInUserResponseDto | ResponseDto | null) => {
    if(!responseBody) { 
      alert("유저 정보에 문제가 있습니다.");
      return ;
    }

    const { code } = responseBody;
    if(code === 'NU') {
      alert("유저 정보에 문제가 있습니다.");
      return ;
    }
    if(code === 'IE') {
      alert("서버 에러입니다. 다시 시도해주세요!");
      return ;
    }
    if(code === 'AF') {
      alert("권한이 없습니다.");
      return ;
    }
    if(code === 'SU' && 'email' in responseBody) {
      const { email , nickname } = responseBody;
      const responseUser : UserInfo = {
        isLogin : true,
        email,
        nickname
      }
      dispatch(signIn(responseUser));
      return ;
    }
    
  }

  useEffect(() => {
    if(!cookies.accessToken) {
      dispatch(signOut());
    } else {
      getSignInUserRequest(cookies.accessToken)
      .then(getSignInResponseHandler)
    }
  },[cookies.accessToken])
  
  return (
    <div id='header'>
      <div className='logo-container'>
        <div className='logo-text'>{'minP'}</div>
      </div>
      <div className='right-side-container'>
        <div className='search-box'></div>
        <div className='user-status-box'>
          {!user.isLogin ?
            <Button text={'Sign-in'} onClick={() => navigate(SIGN_IN_PATH())}/> : 
            <div>{user.nickname}</div>
          }
        </div>
      </div>
    </div>
  )
}