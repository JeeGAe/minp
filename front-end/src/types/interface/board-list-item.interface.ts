export default interface BoardListItem {
  boardNumber : number
  title : string;
  content : string;
  writerEmail : string;
  writerNickname : string;
  writeTime : string;
  recentModifyTime : string;
  viewCount : number;
  favoriteCount : number;
  commentCount : number;
  mainImage : string;
}