import { Dispatch, SetStateAction } from 'react';
import './style.css';

interface Props {
  currentPageNumber : number;
  setCurrentPageNumber : Dispatch<SetStateAction<number>>;
  currentSectionNumber : number;
  setCurrentSectionNumber : Dispatch<SetStateAction<number>>;
  viewSectionNumberList : number[];
  lastSectionNumber : number;
}

export default function Pagination(props:Props) {

  const { currentPageNumber, currentSectionNumber, viewSectionNumberList, lastSectionNumber } = props;
  const { setCurrentPageNumber, setCurrentSectionNumber } = props;

  const onClickPrevSectionButtonHandler = () => {
    if(currentSectionNumber === 1) return ;
    const countPerSection = 10;
    setCurrentPageNumber((currentSectionNumber - 1) * countPerSection);
    setCurrentSectionNumber(currentSectionNumber - 1);
  }

  const onClickNextSectionButtonHandler = () => {
    if(currentSectionNumber === lastSectionNumber) return ;
    const countPerSection = 10;
    setCurrentPageNumber((currentSectionNumber * countPerSection) + 1);
    setCurrentSectionNumber(currentSectionNumber + 1);
  }

  const onClickPageHandler = (page:number) => {
    setCurrentPageNumber(page);
  }

  return (
    <div id='pagination-wrapper'>
      <div className='pagintaion-prev-container'>
        <div className={`pagination-button ${currentSectionNumber === 1 ? 'inactive' : ''}`} onClick={onClickPrevSectionButtonHandler}>{'이전'}</div>
      </div>
      <div className='pagination-page-container'>
        {viewSectionNumberList?.map((page) => 
        page === currentPageNumber ? <div key={page} className='pagination-currnet-page'>{page}</div>
        : <div key={page} className='pagination-page' onClick={() => onClickPageHandler(page)}>{page}</div>
        )}
      </div>
      <div className='pagination-next-container'>
        <div className={`pagination-button ${currentSectionNumber === lastSectionNumber ? 'inactive' : ''}`} onClick={onClickNextSectionButtonHandler}>{'다음'}</div>
      </div>
    </div>
  )
}