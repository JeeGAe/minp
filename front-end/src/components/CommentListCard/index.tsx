import { CommentListItem } from '../../types/interface';
import './style.css';

interface Props {
  commentList : CommentListItem[];
}

export default function CommentListCard(props:Props) {

  const { commentList } = props;

  return (
    <div id='comment-list-card-wrapper'>
      {commentList.map((item) => <div key={item.nickname + item.writeTime} className='comment-list-card-box'>
        <div className='comment-list-card-nickname'>{item.nickname}</div><div>{item.content}</div>
        </div>)
      }
    </div>
  )
}