
import './style.css';

import Button from '../../../components/Button';
import { ChangeEvent, useRef, useState } from 'react';
import { uploadImageRequest } from '../../../apis/file';
import { postBoardRequest } from '../../../apis/board';
import { PostBoardRequestDto } from '../../../apis/request/board';
import { useCookies } from 'react-cookie';
import { PostBoardResponseDto } from '../../../apis/response/board';
import { ResponseDto } from '../../../apis/response';
import { useNavigate } from 'react-router-dom';
import ThumbnailCard from '../../../components/ThumbnailCard';

export default function BoardWrite() {

  // states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const titleInputRef = useRef<HTMLTextAreaElement | null>(null);
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [cookies, setCookies] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const onClickAddImageButtonHandler = () => {
    imageInputRef.current?.click();
  }

  const onClickImageDeleteButtonHandler = (index:number) => {

    if(images.length <= 1) {
      setImages([]);
      setThumbnails([]);
      return ;
    }

    const newFileList = [];
    const newThumbnailList = [];

    for(let i = 0; i < images.length; i++){
      if(index !== i) {
        newFileList.push(images[i]);
        newThumbnailList.push(thumbnails[i]);
      }
    }

    setImages(newFileList);
    setThumbnails(newThumbnailList);
    return ;

  }

  const onChangeTitleHandler = (event : ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    if(!titleInputRef.current) return ;
    titleInputRef.current.style.height = 'auto';
    titleInputRef.current.style.height = `${titleInputRef.current.scrollHeight}px`;
  }

  const onChangeContentHandler = (event : ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if(!contentInputRef.current) return ;
    contentInputRef.current.style.height = 'auto';
    contentInputRef.current.style.height = `${contentInputRef.current.scrollHeight}px`;
  }

  const onChangeImageHandler = (event : ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if(!files) return ;
    if(files.length > 5) {
      alert("5개까지 사진을 추가 할 수 있습니다.");
      return ;
    }

    const fileList = [];
    const newThumbnailList = [];
    
    for(let i = 0; i < files.length; i++) {
      const filesUrl = URL.createObjectURL(files[i]);

      newThumbnailList.push(filesUrl);
      fileList.push(files[i]);
    }

    // 같은 파일 업로드 시 onChage 이벤트 발생이 안되어 초기화하여 해결
    event.target.value = "";

    setThumbnails(newThumbnailList);
    setImages(fileList);
  }

  const postBoardResponseHandler = (responseBody : PostBoardResponseDto | ResponseDto | null) => {
    if(!responseBody) return ;

    if(responseBody.code === 'VF') {
      alert('입력을 확인해주세요');
      return ;
    }
    if(responseBody.code === 'AF') {
      alert('권한이 없습니다.');
      return ;
    }
    if(responseBody.code === 'IE') {
      alert('서버에 문제가 있습니다.');
      return ;
    }
    if(responseBody.code === 'SU') {
      navigate('/');
      return ;
    }

  }

  const onClickUploadButtonHandler = async () => {
    
    const boardImageList : string[] = [];

    if(!images) return ;
    for(const image of images) {
      const data = new FormData();
      data.append('file', image);

      const url = await uploadImageRequest(data, cookies.accessToken);
      if(url) boardImageList.push(url);
    }


    const requestBody : PostBoardRequestDto = {
      title,
      content,
      boardImageList
    }

    postBoardRequest(requestBody, cookies.accessToken)
    .then(postBoardResponseHandler)

  }

  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-upload-button-box'>
          <Button text={'업로드'} onClick={onClickUploadButtonHandler}/>
        </div>
        <div className='board-write-title-box'>
          <textarea ref={titleInputRef} rows={1} value={title} onChange={onChangeTitleHandler} placeholder='제목을 입력하세요.'/>
        </div>
        <div className='board-write-content-box'>
          <textarea ref={contentInputRef} value={content} onChange={onChangeContentHandler} placeholder='내용을 입력하세요.' />
        </div>
        <div className='board-write-add-image-button-box'>
          <input ref={imageInputRef} type='file' multiple onChange={onChangeImageHandler}/>
          <Button text={'이미지 추가'} onClick={onClickAddImageButtonHandler}/>
        </div>
        {thumbnails.length !== 0 &&
        <div className='board-write-thumbnail-box'>
          {thumbnails?.map((thumbnailUrl, index) => <ThumbnailCard key={thumbnailUrl} index={index} src={thumbnailUrl} isCloseButton={true} onClickCloseButton={onClickImageDeleteButtonHandler} />)}
        </div>
        }
      </div>
    </div>
  )
}