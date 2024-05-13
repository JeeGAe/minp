import { GET_ALL_USER_BOARD_LIST_URL, POST_BOARD_URL } from "../../constants"
import { PostBoardRequestDto } from "../request/board"
import { ResponseDto } from "../response";
import getAllUserBoarListResponseDto from "../response/board/getAllUserBoardList.response.dto";
import PostBoardResponseDto from "../response/board/postBoard.response.dto";

export const getAllUserBoarList = async (accessToken : string) => {

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
