import { useNavigate } from 'react-router-dom';
import { BoardListItem } from '../../types/interface';
import './style.css';

interface Props {
  boardListItem : BoardListItem
}

export default function BoardMainCard({ boardListItem }:Props) {

  const { title, viewCount, favoriteCount, commentCount, boardImageList, boardNumber } = boardListItem;
  
  const navigate = useNavigate();

  const onClickTitleHandler = () => {
    navigate(`/board/detail/${boardNumber}`);
  }

  return (
    <div className='board-main-card' style={{backgroundImage : `${boardImageList.length !== 0 && `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(${boardImageList[0]})` }`}}>
      <div className='board-main-card-title-box'>
        <div className='board-main-card-title-text' onClick={onClickTitleHandler}>{title}</div>
      </div>
      <div className='board-main-card-engagement'>
        {`좋아요 • ${favoriteCount} 조회수 • ${viewCount} 댓글수 • ${commentCount}`}
      </div>
    </div>
  )
  
}