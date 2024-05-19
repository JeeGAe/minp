export const MAIN_PATH = () => '/';
export const SIGN_UP_PATH = () => '/signup';
export const SIGN_IN_PATH = () => '/signin';
export const USER_PATH = () => '/user';
export const BOARD_PATH = () => '/board';
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_UPDATE_PATH = () => 'update';

export const PORT = '3300';
export const DOMAIN = `http://localhost:${PORT}`;

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

export const POST_BOARD_URL = `${API_DOMAIN}/board`;

export const PATCH_BOARD_URL = (boardNumber : number) => `${API_DOMAIN}/board/${boardNumber}`;

export const DELETE_BOARD_URL = (boardNumber : number) => `${API_DOMAIN}/board/${boardNumber}`;
