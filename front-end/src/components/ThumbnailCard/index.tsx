import { MouseEvent } from 'react';
import './style.css';

interface Props {
  index : number;
  src : string

  isButton? : boolean;
  onClick? : (index:number) => void;
}

export default function ThumbnailCard(props:Props) {
  
  const { index, src } = props;
  const { isButton, onClick } = props;

  const onClickHandler = () => {
    if(!onClick) return ;
    
    onClick(index);
  }

  return (
    <div className='thumbnail-card-container'>
      <div onClick={onClickHandler}>{'X'}</div>
      <img src={src} />
    </div>
  )
}