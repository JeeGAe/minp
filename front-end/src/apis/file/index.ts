import { FILE_UPLOAD_URL } from "../../constants"

export const uploadImageRequest = async (data: FormData) => {

  const result = await fetch(FILE_UPLOAD_URL, {
    method : 'POST',
    headers : {
      'Content-Type' : 'multipart/form-data'
    },
    body : data
  })
  .then(async (response) => {
    if(!response.ok) {
      throw await response.json();
    }

    return response.json();
  })
  .then(response => {
    const responseBody : string = response;
    return responseBody;
  })
  .catch(error => {
    return null;
  })

}