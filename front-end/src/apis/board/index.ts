import { POST_BOARD_URL } from "../../constants"
import { PostBoardRequestDto } from "../request/board"
import { ResponseDto } from "../response";
import PostBoardResponseDto from "../response/board/postBoard.response.dto";

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
    const requestBody : ResponseDto = error;
    if(!requestBody) return null;
    return requestBody;
  })

  return result;

}