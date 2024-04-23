import { useAppSelector } from '../../hooks/store.hook';
import { UserInfo } from '../../types/interface';

export default function Header() {
  const user : UserInfo = useAppSelector((state) => state.user);
  console.log(user);
  
  return (
    <div>
      {`${user.email}`}
      {`${user.nickname}`}
      {`${user.isLogin}`}
    </div>
  )
}