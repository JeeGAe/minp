import ResponseDto from '../response.dto';
import { BoardListItem } from '../../../types/interface';

export default interface GetBoardResponseDto extends ResponseDto {
  boardItem : BoardListItem;
}