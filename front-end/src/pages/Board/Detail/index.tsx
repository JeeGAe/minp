import { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { getBoardRequest, getCommentListRequest, getFavoriteListRequest } from '../../../apis/board';
import { GetBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto } from '../../../apis/response/board';
import { ResponseDto } from '../../../apis/response';
import { BoardListItem, CommentListItem, FavoriteListItem } from '../../../types/interface';

export default function BoardDetail() {

  const { boardNumber } = useParams();

  const [title, setTitle] = useState('');
  const [writerNickname, setWriterNickname] = useState('');
  const [content, setContent] = useState('');
  const [boardImageList, setBoardImageList] = useState<string[]>([]);
  const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);

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
      console.log(favoriteList)
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
      console.log(commentList)
      setCommentList(commentList);
    }
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
        <div className='board-detail-title-container'>
          <div className='board-detail-title-text'>{title}</div>
          <div className='board-detail-proflie-box'>
            <div className='board-detail-profile-image'></div>
            <div className='board-detail-profile-nickname'>{writerNickname}</div>
          </div>
        </div>
        <div className='board-detail-content-box'>{content}</div>
        <div className='board-detail-image-box'>{boardImageList.map((url) => <img key={url} src={url}/>)}</div>
      </div>
      <div className='baord-detail-favorite-container'>{favoriteList.map((item, i) => <div  key={i}>{item.email}</div>)}</div>
      <div className='board-detail-comment-container'>{commentList.map((item) => <div key={item.content}>{item.content}</div>)}</div>
    </div>
  )
}