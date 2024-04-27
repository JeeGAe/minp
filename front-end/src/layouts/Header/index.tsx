import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { UserInfo } from '../../types/interface';
import { useEffect } from 'react';
import { signIn, signOut } from '../../store/user-slice.store';
import { getSignInUserRequest } from '../../apis/user';
import { GetSignInUserResponseDto } from '../../apis/response/user';
import { ResponseDto } from '../../apis/response';

export default function Header() {
  const user : UserInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // 쿠키 상태
  const [cookies, setCookies] = useCookies(['accessToken']);

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
      alert("만료된 권한입니다.");
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
    <div>
      {`${user.email}`}
      {`${user.nickname}`}
      {`${user.isLogin}`}
    </div>
  )
}