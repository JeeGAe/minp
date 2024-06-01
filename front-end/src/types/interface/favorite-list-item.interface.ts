import UserInfo from "./user-info.interface";

export default interface FavoriteListItem extends Omit<UserInfo, 'isLogin'> {
  
}