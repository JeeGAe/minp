import { useEffect, useState } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getAllUserBoarList } from '../../apis/board';
import { BoardListItem } from '../../types/interface';
import { ResponseDto } from '../../apis/response';
import { GetAllUserBoardListResponseDto } from '../../apis/response/board';
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

    if(responseBody.code === 'SU' && 'userBoardList' in responseBody) {
      const { userBoardList } = responseBody;
      setBoardListItem(userBoardList);
    }

    if(responseBody.code === 'NU') {
      alert("없는 유저입니다.");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버 에러입니다.");
      return ;
    }
  }

  useEffect(() => {
    if(!cookies.accessToken) {
      alert("권한이 없습니다!");
      navigate('/');
    }

    getAllUserBoarList(cookies.accessToken)
    .then(getAllUserBoarListResponseHandler)
  }, [])

  return (
    <div>
      {boardListItem.map((item) => (<UserBoardListCard key={item.boardNumber} boardListItem={item} />))}
    </div>
  )
}