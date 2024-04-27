import { SIGN_IN_URL, SIGN_UP_URL } from "../../constants";
import { SignInRequestDto, SignUpRequestDto } from "../request/auth";
import { ResponseDto } from "../response";
import { SignInResponseDto, SignUpResponseDto } from "../response/auth";

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

export const signInRequest = async (requestBody : SignInRequestDto) => {
  const result = await fetch(SIGN_IN_URL, {
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
    const responseBody : SignInResponseDto = response;
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