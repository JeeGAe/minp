export const MAIN_PATH = () => '/';
export const SIGN_UP_PATH = () => '/signup';
export const SIGN_IN_PATH = () => '/signin';

export const PORT = '3300';
export const DOMAIN = `http://localhost:${PORT}`;

export const API_DOMAIN = `${DOMAIN}/api`;

export const SIGN_UP_URL = `${API_DOMAIN}/auth/sign-up`;
export const SIGN_IN_URL = `${API_DOMAIN}/auth/sign-in`;

export const FILE_UPLOAD_URL = `${DOMAIN}/file/upload`;

export const GET_SIGN_IN_USER_URL = `${API_DOMAIN}/user`;

export const POST_BOARD_URL = `${API_DOMAIN}/board`;