import { useEffect, useState } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { deleteBoardRequest, getAllUserBoarListRequest } from '../../apis/board';
import { BoardListItem } from '../../types/interface';
import { ResponseDto } from '../../apis/response';
import { DeleteBoardResponseDto, GetAllUserBoardListResponseDto } from '../../apis/response/board';
import UserBoardListCard from '../../components/UserBoardListCard';


export default function User() {

  const [boardListItem, setBoardListItem] = useState<BoardListItem[]>([]);

  const [cookies, setCookies] = useCookies(['accessToken']);

  const navigate = useNavigate();

  if(!cookies.accessToken) {
    alert("권한이 없습니다!");
    navigate('/');
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

  useEffect(() => {
    if(!cookies.accessToken) {
      alert("권한이 없습니다!");
      navigate('/');
    }

    getAllUserBoarListRequest(cookies.accessToken)
    .then(getAllUserBoarListResponseHandler)
  }, [])


  const onClickUpdateButtonHandler = () => {
    navigate(`/board/update`, { state : { boardListItem } })
  }

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

  const onClickDeleteButtonHandler = (boardNumber : number) => {
    if(!window.confirm("삭제하시겠습니까?")) return;
    
    deleteBoardRequest(boardNumber, cookies.accessToken)
    .then(delteBoardResponseHandler)

  }

  return (
    <div>
      {boardListItem.map((item) => (<UserBoardListCard key={item.boardNumber} boardListItem={item} onClickUpdateButton={onClickUpdateButtonHandler} onClickDeleteButton={() => onClickDeleteButtonHandler(item.boardNumber)} />))}
    </div>
  )
}