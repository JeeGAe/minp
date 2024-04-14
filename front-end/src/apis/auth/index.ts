import { SIGN_UP_URL } from "../../constants";
import { SignUpRequestDto } from "../request/auth";
import { ResponseDto } from "../response";
import { SignUpResponseDto } from "../response/auth";

export const signUpRequest = async (requestBody : SignUpRequestDto) => {

    const result = await fetch(SIGN_UP_URL, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(requestBody),
    })
    .then(async (response) => {
      if(!response.ok) {
        throw await response.json();
      }

      return response.json();
    })
    .then(response => {
      const responseBody : SignUpResponseDto = response;
      if(!requestBody) return null;
      return responseBody;
      
    })
    .catch(error => {
      const responseBody : ResponseDto = error;
      console.log(error);
      if(!requestBody) return null;
      return responseBody;
    })
  
    return result;
}