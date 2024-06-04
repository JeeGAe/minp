import { BoardListItem } from '../../../types/interface';
import ResponseDto from '../response.dto';

export default interface GetLatest3BoardResponseDto extends ResponseDto {
  boardList : BoardListItem[];
}