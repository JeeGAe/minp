import { MouseEvent } from 'react';
import './style.css';

interface Props {
  index : number;
  src : string

  isCloseButton? : boolean;
  onClickCloseButton? : (index:number) => void;
}

export default function ThumbnailCard(props:Props) {
  
  const { index, src } = props;
  const { isCloseButton, onClickCloseButton } = props;

  const onClickHandler = () => {
    if(!onClickCloseButton) return ;
    
    onClickCloseButton(index);
  }

  return (
    <div className='thumbnail-card-container'>
      {isCloseButton &&
        <div onClick={onClickHandler}>{'X'}</div>
      }
      <img src={src} />
    </div>
  )
}