import UserInfo from "./user-info.interface";

export default interface CommentListItem extends Omit<UserInfo, 'email' | 'isLogin'> {
  content : string;
  writeTime : string;
} 