import { BoardListItem } from '../../types/interface';
import Button from '../Button';
import './style.css';

interface Props {
  boardListItem : BoardListItem
}

export default function UserBoardListCard(props:Props) {

  const { title, mainImage } = props.boardListItem;

  return (
    <div className='user-board-list-card-wrapper'>
      <div className='user-board-list-card-left-container'>
        <div className='user-board-list-card-image-box'>
          <img src={mainImage}/>
        </div>
        <div className='user-board-list-card-title-box'>{title}</div>
      </div>
      <div className='user-board-list-card-right-container'>
        <div className='user-board-list-card-modify-button-box'>
          <Button text={'수정'} />
        </div>
        <div className='user-board-list-card-delete-button-box'>
          <Button text={'삭제'} />
        </div>
      </div>
    </div>
  )
}