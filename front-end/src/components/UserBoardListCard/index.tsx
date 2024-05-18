import { useNavigate } from 'react-router-dom';
import { BoardListItem } from '../../types/interface';
import Button from '../Button';
import './style.css';
import { BOARD_PATH, BOARD_UPDATE_PATH } from '../../constants';

interface Props {
  boardListItem : BoardListItem
}

export default function UserBoardListCard(props:Props) {

  const { boardListItem } = props;
  const { title, boardImageList } = boardListItem;

  const navigate = useNavigate();

  const onClickUpdateButtonHandler = () => {
    navigate(`/board/update`, { state : { boardListItem } })
  }

  return (
    <div className='user-board-list-card-wrapper'>
      <div className='user-board-list-card-left-container'>
        <div className='user-board-list-card-image-box'>
          {boardImageList.length !== 0 &&
          <img src={boardImageList[0]}/>
          }
        </div>
        <div className='user-board-list-card-title-box'>{title}</div>
      </div>
      <div className='user-board-list-card-right-container'>
        <div className='user-board-list-card-modify-button-box'>
          <Button text={'수정'} onClick={onClickUpdateButtonHandler}/>
        </div>
        <div className='user-board-list-card-delete-button-box'>
          <Button text={'삭제'} />
        </div>
      </div>
    </div>
  )
}