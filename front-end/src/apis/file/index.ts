import { FILE_UPLOAD_URL } from "../../constants"

export const uploadImageRequest = async (data: FormData, accessToken : string) => {

  const bearerToken = `Bearer ${accessToken}`;

  const result = await fetch(FILE_UPLOAD_URL, {
    method : 'POST',
    headers : {
      //'Content-Type' : 'multipart/form-data',
      'Authorization' : bearerToken
    },
    body : data
  })
  .then(async (response) => {
    console.log(response)
    if(response.ok) {
      return response.text();
    }

    throw await response.text();
  })
  .then(response => {
    const responseBody : string = response;
    return responseBody;
  })
  .catch(error => {
    return null;
  })

  return result;

}