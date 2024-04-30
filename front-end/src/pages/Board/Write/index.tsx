
import './style.css';

import Button from '../../../components/Button';
import { ChangeEvent, useState } from 'react';
import { uploadImageRequest } from '../../../apis/file';
import { postBoardRequest } from '../../../apis/board';
import { PostBoardRequestDto } from '../../../apis/request/board';
import { useCookies } from 'react-cookie';
import PostBoardResponseDto from '../../../apis/response/board/postBoard.response.dto';
import { ResponseDto } from '../../../apis/response';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>();

  const [cookies, setCookies] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const onChangeImageHandler = (e : ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    let fileList = [];
    if(!files) return ;
    
    for(let i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
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

  const submit = async () => {
    
    const boardImageList : string[] = [];

    if(!images) return ;
    for(const image of images) {
      const data = new FormData();
      data.append('file', image);

      const url = await uploadImageRequest(data, cookies.accessToken);
      console.log(url);
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
    <>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type='text' value={content} onChange={(e) => setContent(e.target.value)} />
      <input type='file' multiple onChange={onChangeImageHandler}/>
      <Button text={'업로드'} onClick={submit}/>
    </>
  )
}