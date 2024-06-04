import { useEffect, useState } from 'react';
import BoardMainCard from '../../components/BoardMainCard';
import './style.css';
import { getLatest3BoardRequest } from '../../apis/board';
import { GetLatest3BoardResponseDto } from '../../apis/response/board';
import { ResponseDto } from '../../apis/response';
import { BoardListItem } from '../../types/interface';

export default function Main() {

  const [latestBoardList, setLatestBoardList] = useState<BoardListItem[]>([]);

  // api response 함수
  const getLatest3BoardResponseHandler = (responseBody:GetLatest3BoardResponseDto|ResponseDto|null) => {

    if(!responseBody) return ;

    if(responseBody.code === 'IE') {
      alert("서버에 문제가 있습니다.");
      return ;
    }
    if(responseBody.code === 'SU') {
      const { boardList } = responseBody as GetLatest3BoardResponseDto;
      setLatestBoardList(boardList);
    }
  }

  useEffect(() => {
    getLatest3BoardRequest()
    .then(getLatest3BoardResponseHandler);
  }, []);

  return (
    <div id='main-wrapper'>
      <div className='main-latest-board-container'>
        <div className='main-latest-board-title'>{'최근 게시물'}</div>
        <div className='main-latest-board-box'>
          {latestBoardList.length !== 0 &&
            latestBoardList.map(board => (<BoardMainCard key={board.boardNumber} boardListItem={board} />))
          }
        </div>
      </div>
    </div>
  )
}