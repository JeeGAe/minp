import { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { getBoardRequest, getCommentListRequest, getFavoriteListRequest, postCommentRequest, putFavoriteRequest } from '../../../apis/board';
import { GetBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from '../../../apis/response/board';
import { ResponseDto } from '../../../apis/response';
import { CommentListItem, FavoriteListItem, UserInfo } from '../../../types/interface';
import { useCookies } from 'react-cookie';
import { useAppSelector, usePagination } from '../../../hooks';
import Pagination from '../../../components/Pagination';
import Button from '../../../components/Button';
import { PostCommentRequestDto } from '../../../apis/request/board';
import { selectUser } from '../../../store/user-slice.store';
import ThumbnailCard from '../../../components/ThumbnailCard';
import CommentListCard from '../../../components/CommentListCard';

export default function BoardDetail() {

  const { boardNumber } = useParams();

  const [title, setTitle] = useState('');
  const [writerNickname, setWriterNickname] = useState('');
  const [content, setContent] = useState('');
  const [boardImageList, setBoardImageList] = useState<string[]>([]);
  const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);
  const [comment, setComment] = useState('');

  const [cookies, setCookies] = useCookies(['accessToken']);

  const user : UserInfo = useAppSelector(selectUser);

  const { setTotalList, viewList, currentPageNumber, setCurrentPageNumber, currentSectionNumber, lastSectionNumber, setCurrentSectionNumber, viewSectionNumberList } = usePagination<CommentListItem>(5);

  // api response 함수
  const getBoardResponseHandler = (responseBody : GetBoardResponseDto|ResponseDto|null) => {

    if(!responseBody) return ;

    if(responseBody.code === 'NB') {
      alert("잘못된 접근입니다!");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버의 문제가 있습니다.");
      return ;
    }
    if(responseBody.code === 'SU') {
      const { title, writerNickname, content, boardImageList} = responseBody as GetBoardResponseDto;
      setTitle(title);
      setWriterNickname(writerNickname);
      setContent(content);
      setBoardImageList(boardImageList);
    }
  }

  const getFavoriteListResponseHandler = (responseBody : GetFavoriteListResponseDto|ResponseDto|null) => {

    if(!responseBody) return ;

    if(responseBody.code === 'NB') {
      alert("잘못된 접근입니다!");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버의 문제가 있습니다.");
      return ;
    }
    if(responseBody.code === 'SU') {
      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);
    }
  }

  const getCommentListResponseHandler = (responseBody : GetCommentListResponseDto|ResponseDto|null) => {

    if(!responseBody) return ;

    if(responseBody.code === 'NB') {
      alert("잘못된 접근입니다!");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버의 문제가 있습니다.");
      return ;
    }
    if(responseBody.code === 'SU') {
      const { commentList } = responseBody as GetCommentListResponseDto;
      setCommentList(commentList);
      setTotalList(commentList);
    }
  }

  const postCommentResponseHandler = (responseBody: PostCommentResponseDto|ResponseDto|null) => {
    
    if(!responseBody || !boardNumber) return ;

    if(responseBody.code === 'NB') {
      alert("게시물을 찾을 수 없습니다.");
      return ;
    }
    if(responseBody.code === 'NU' || responseBody.code === 'AF') {
      alert("권한이 없습니다.");
      return ;
    }
    if(responseBody.code === 'VF') {
      alert("내용을 다시 확인해주세요.");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버에 문제가 있습니다.");
    }
    if(responseBody.code === 'SU') {
      setComment('');
      getCommentListRequest(boardNumber)
      .then(getCommentListResponseHandler);
    }
  }

  const putFavoriteResponseHandler = (responseBody: PutFavoriteResponseDto|ResponseDto|null) => {

    if(!responseBody || !boardNumber) return ;

    if(responseBody.code === 'NB') {
      alert("게시물을 찾을 수 없습니다.");
      return ;
    }
    if(responseBody.code === 'NU' || responseBody.code === 'AF') {
      alert("권한이 없습니다.");
      return ;
    }
    if(responseBody.code === 'IE') {
      alert("서버에 문제가 있습니다.");
    }
    if(responseBody.code === 'SU') {
      getFavoriteListRequest(boardNumber)
      .then(getFavoriteListResponseHandler);
    }

  }

  // 이벤트 함수
  const onChageCommentInputHandler = (event:ChangeEvent<HTMLInputElement>) => {

    const { value } = event.target;
    setComment(value);
  }

  const onClickCommentWriteButtonHandler = () => {
    
    if(!cookies.accessToken || !boardNumber || comment.trim() === '') return ;

    const resquestBody : PostCommentRequestDto = {
      content: comment
    }

    postCommentRequest(resquestBody, boardNumber, cookies.accessToken)
    .then(postCommentResponseHandler);
  }

  const onClickFavoriteButtonHandler = () => {

    if(!cookies.accessToken || !boardNumber) return ;

    putFavoriteRequest(boardNumber, cookies.accessToken)
    .then(putFavoriteResponseHandler)
  } 

  useEffect(() => {
    if(!boardNumber) return ;

    getBoardRequest(boardNumber)
    .then(getBoardResponseHandler);
    getFavoriteListRequest(boardNumber)
    .then(getFavoriteListResponseHandler);
    getCommentListRequest(boardNumber)
    .then(getCommentListResponseHandler);

  },[boardNumber]);

  

  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <div className='board-detail-article-container'>
          <div className='board-detail-title-box'>
            <div className='board-detail-title-text'>{title}</div>
            <div className='board-detail-proflie-box'>
              <div className='board-detail-profile-image'></div>
              <div className='board-detail-profile-nickname'>{writerNickname}</div>
            </div>
          </div>
          <div className='board-detail-content-box'>{content}</div>
          <div className='board-detail-image-box'>{boardImageList.map((url, index) => <ThumbnailCard key={url} index={index} src={url} />)}</div>
        </div>
        <div className='board-detail-divider'></div>
        <div className='board-detail-favorite-box'>
          {user.isLogin &&
            <div className='board-detail-favorite-button' onClick={onClickFavoriteButtonHandler}>{favoriteList?.filter(item => item.email === user.email).length !== 0 ? `💖` : `🤍`}</div>
          }
          <div className='board-detail-favorite-list'>
            {favoriteList?.map((item, index) => {if(index < 2) return <span className='board-detail-favorite-nickname' key={item.nickname}>{item.nickname}</span>})}
            {favoriteList.length > 2 && '...'}
            {favoriteList.length !== 0 && ' 님이 좋아요 중'}
          </div>
        </div>

        <div className='board-detail-comment-box'>
          {viewList.length !== 0 &&
          <>
            <CommentListCard commentList={viewList}/>
            <div className='board-detail-comment-pagination-box'>
              <Pagination 
                currentPageNumber={currentPageNumber} 
                setCurrentPageNumber={setCurrentPageNumber} 
                currentSectionNumber={currentSectionNumber} 
                setCurrentSectionNumber={setCurrentSectionNumber} viewSectionNumberList={viewSectionNumberList} 
                lastSectionNumber={lastSectionNumber} />
            </div>
          </>
          }
          
          {user.isLogin &&
            <div className='board-detail-comment-write-box'>
              <input className='board-detail-comment-input' type='text' value={comment} onChange={onChageCommentInputHandler}/>
              <Button text={'댓글 작성'} onClick={onClickCommentWriteButtonHandler}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}