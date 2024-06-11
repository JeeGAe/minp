import { useEffect, useState } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { deleteBoardRequest, getAllUserBoarListRequest } from '../../apis/board';
import { BoardListItem, UserInfo } from '../../types/interface';
import { ResponseDto } from '../../apis/response';
import { DeleteBoardResponseDto, GetAllUserBoardListResponseDto } from '../../apis/response/board';
import UserBoardListCard from '../../components/UserBoardListCard';
import Button from '../../components/Button';
import userSliceStore, { selectUser, signOut } from '../../store/user-slice.store';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';


export default function User() {

  const [boardListItem, setBoardListItem] = useState<BoardListItem[]>([]);

  const [cookies, setCookies, removeCookies] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const user : UserInfo = useAppSelector(selectUser);
  const dispatch = useDispatch()

  if(!cookies.accessToken) {
    alert("권한이 없습니다!");
    navigate('/');
  }

  // event 함수

  const onClickUpdateButtonHandler = (boardListItem:BoardListItem) => {
    navigate(`/board/update`, { state : { boardListItem } })
  }


  const onClickDeleteButtonHandler = (boardNumber : number) => {
    if(!window.confirm("삭제하시겠습니까?")) return;
    
    deleteBoardRequest(boardNumber, cookies.accessToken)
    .then(delteBoardResponseHandler)

  }

  const onClickUploadButtonHandler = () => {
    navigate('/board/write');
    return ;
  }

  const onClickSignOutButtonHandler = () => {
    removeCookies('accessToken');
    dispatch(signOut());
    navigate('/');
    return ;
  }

  // response 함수

  const delteBoardResponseHandler = (responseBody : DeleteBoardResponseDto | ResponseDto | null) => {
    if(!responseBody) return ;

    if(responseBody.code === 'NU' ||
      responseBody.code === 'NB' ||
      responseBody.code === 'NP' ||
      responseBody.code === 'AF') {
        alert("권한이 없습니다.");
        return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버에 문제가 있습니다.");
      return ;
    }
    if(responseBody.code === 'SU') {
      alert("게시물이 삭제되었습니다.");
      window.location.reload();
      return ;
    }
  }

  const getAllUserBoarListResponseHandler = (responseBody : GetAllUserBoardListResponseDto | ResponseDto | null) => {
    if(!responseBody) return ;

    if(responseBody.code === 'NU') {
      alert("없는 유저입니다.");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버 에러입니다.");
      return ;
    }

    // if(responseBody.code === 'SU' && 'userBoardList' in responseBody) {
    //   const { userBoardList } = responseBody;
    //   setBoardListItem(userBoardList);
    // }

    if(responseBody.code === 'SU') {
      const { userBoardList } = responseBody as GetAllUserBoardListResponseDto;
      setBoardListItem(userBoardList);
    }
  }

  // effect

  useEffect(() => {
    if(!cookies.accessToken || !user.isLogin) {
      alert("권한이 없습니다!");
      navigate('/');
      return ;
    }

    getAllUserBoarListRequest(cookies.accessToken)
    .then(getAllUserBoarListResponseHandler)
  }, []);


  return (
    <div id='user-wrapper'>
      <div className='user-top-container'>
        <div className='user-upload-button-box'>
          <Button text='UPLOAD' onClick={onClickUploadButtonHandler}/>
        </div>
        <div className='user-sign-out-button-box'>
          <Button text='SIGN OUT' color='negative' onClick={onClickSignOutButtonHandler}/>
        </div>
      </div>
      <div className='user-botton-container'>
        {boardListItem.map((item) => (<UserBoardListCard key={item.boardNumber} boardListItem={item} onClickUpdateButton={() => onClickUpdateButtonHandler(item)} onClickDeleteButton={() => onClickDeleteButtonHandler(item.boardNumber)} />))}
      </div>
    </div>
  )
}