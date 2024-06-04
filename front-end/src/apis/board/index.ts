import { DELETE_BOARD_URL, GET_ALL_USER_BOARD_LIST_URL, GET_BOARD_URL, GET_COMMENT_LIST_URL, GET_FAVORITE_LIST_URL, GET_LATEST_3_BOARD_LIST_URL, PATCH_BOARD_URL, POST_BOARD_URL, POST_COMMENT_URL, PUT_FAVORITE_URL } from "../../constants"
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from "../request/board"
import { ResponseDto } from "../response";
import { DeleteBoardResponseDto, GetBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, GetLatest3BoardResponseDto, PatchBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from "../response/board";
import getAllUserBoarListResponseDto from "../response/board/getAllUserBoardList.response.dto";
import PostBoardResponseDto from "../response/board/postBoard.response.dto";

export const getAllUserBoarListRequest = async (accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = fetch(GET_ALL_USER_BOARD_LIST_URL, {
    method : 'GET',
    headers : {
      'Authorization' : bearerToken,
    }
  })
  .then(async(response) => {
    if(!response.ok) {
      throw await response.json();
    }
    return response.json();
  })
  .then(response => {
    const responseBody : getAllUserBoarListResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
  
}

export const getBoardRequest = async (boardNumber : number|string) => {

  const result = fetch(GET_BOARD_URL(boardNumber))
  .then(async(response) => {
    if(!response.ok) {
      throw await response.json();
    }
    return response.json();
  })
  .then(response => {
    const responseBody : GetBoardResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const getFavoriteListRequest = async (boardNumber: number|string) => {
  
  const result = await fetch(GET_FAVORITE_LIST_URL(boardNumber))
  .then(async (response) => {
    if(!response.ok) {
      throw await response.json();
    }
    return response.json();
  })
  .then(response => {
    const responseBody : GetFavoriteListResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const getCommentListRequest = async (boardNumber : number|string) => {

  const result = await fetch(GET_COMMENT_LIST_URL(boardNumber))
  .then(async (response) => {
    if(!response.ok) throw await response.json();
    return response.json();
  })
  .then(response => {
    const responseBody : GetCommentListResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const getLatest3BoardRequest = async () => {

  const result = await fetch(GET_LATEST_3_BOARD_LIST_URL)
  .then(async (response) => {
    if(!response.ok) throw await response.json();
    return response.json();
  })
  .then(response => {
    const responseBody : GetLatest3BoardResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const postBoardRequest = async (requestBody : PostBoardRequestDto, accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = fetch(POST_BOARD_URL, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : bearerToken,
    },
    body : JSON.stringify(requestBody)
  })
  .then(async(response) => {
    if(!response.ok) {
      throw await response.json();
    }
    return response.json();
  })
  .then(response => {
    const responseBody : PostBoardResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;

}

export const postCommentRequest = async (requestBody : PostCommentRequestDto, boardNumber : number|string, accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = await fetch(POST_COMMENT_URL(boardNumber), {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : bearerToken,
    },
    body : JSON.stringify(requestBody)
  })
  .then(async (response) => {
    if(!response.ok) throw await response.json();
    return response.json();
  })
  .then(response => {
    const responseBody : PostCommentResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const putFavoriteRequest = async (boardNumber : number|string, accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = await fetch(PUT_FAVORITE_URL(boardNumber), {
    method : 'PUT',
    headers : {
      'Authorization' : bearerToken,
    }
  })
  .then(async (response) => {
    if(!response.ok) throw await response.json();
    return response.json();
  })
  .then(response => {
    const responseBody : PutFavoriteResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const patchBoardRequest = async (requestBody : PatchBoardRequestDto, boardNumber : number|string, accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = await fetch(PATCH_BOARD_URL(boardNumber), {
    method : 'PATCH',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : bearerToken
    },
    body : JSON.stringify(requestBody)
  })
  .then(async (response) => {
    if(!response.ok) {
      throw await response.json();
    }
    return response.json();
  })
  .then(response => {
    const responseBody : PatchBoardResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}

export const deleteBoardRequest = async (boardNumber : number, accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = await fetch(DELETE_BOARD_URL(boardNumber), {
    method : 'DELETE',
    headers : {
      'Authorization' : bearerToken
    }
  })
  .then(async (response) => {
    if(!response.ok) {
      throw await response.json();
    }
    return response.json();
  })
  .then(response => {
    const responseBody : DeleteBoardResponseDto = response;
    if(!responseBody) return null;
    return responseBody;
  })
  .catch(error => {
    const responseBody : ResponseDto = error;
    if(!responseBody) return null;
    return responseBody;
  })

  return result;
}