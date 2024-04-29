import { GET_SIGN_IN_USER_URL } from "../../constants"
import { ResponseDto } from "../response";
import { GetSignInUserResponseDto } from "../response/user";

export const getSignInUserRequest = async (accessToken : string) => {

  if(!accessToken) return ;
  const bearerToken = `Bearer ${accessToken}`;
  
  const result = await fetch(GET_SIGN_IN_USER_URL, {
    method : 'GET',
    headers : {
      'Authorization' : bearerToken,
    }
  })
  .then(async (response) => {
    if(!response.ok) {
      throw await response.json();
    }

    return response.json();
  })
  .then(response => {
    const responseBody : GetSignInUserResponseDto = response;
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