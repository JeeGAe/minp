import ResponseDto from '../response.dto';
import { BoardListItem } from '../../../types/interface';

export default interface GetAllUserBoardListResponseDto extends ResponseDto {
  userBoardList : BoardListItem[];
}