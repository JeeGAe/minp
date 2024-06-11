export const MAIN_PATH = () => '/';
export const SIGN_UP_PATH = () => '/signup';
export const SIGN_IN_PATH = () => '/signin';
export const USER_PATH = () => '/user';
export const BOARD_PATH = () => '/board';
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_UPDATE_PATH = () => 'update';
export const BOARD_DETAIL_PATH = (boardNumber:string|number) => `detail/${boardNumber}`;
export const PORT = '3300';

const apiUrl = (process.env.REACT_APP_API_URL as string);
if (!apiUrl) {
  throw new Error('REACT_APP_API_URL 환경 변수가 정의되지 않았습니다.');
}

export const DOMAIN = `http://${apiUrl}:${PORT}`;

export const API_DOMAIN = `${DOMAIN}/api`;

// auth api url
export const SIGN_UP_URL = `${API_DOMAIN}/auth/sign-up`;
export const SIGN_IN_URL = `${API_DOMAIN}/auth/sign-in`;

// file api url
export const FILE_UPLOAD_URL = `${DOMAIN}/file/upload`;

// user api url
export const GET_SIGN_IN_USER_URL = `${API_DOMAIN}/user`;

// board api url
export const GET_ALL_USER_BOARD_LIST_URL = `${API_DOMAIN}/board/all-user-board`;
export const GET_BOARD_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}`;
export const GET_FAVORITE_LIST_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;
export const GET_COMMENT_LIST_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}/comment`;
export const GET_LATEST_3_BOARD_LIST_URL = `${API_DOMAIN}/board/latest-3-board`;

export const POST_BOARD_URL = `${API_DOMAIN}/board`;
export const POST_COMMENT_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}/comment`;

export const PUT_FAVORITE_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;

export const PATCH_BOARD_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}`;

export const DELETE_BOARD_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}`;
