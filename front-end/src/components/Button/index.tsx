
import { forwardRef } from 'react';
import './style.css';

interface Props {
  text : string;
  size? : 'wide';

  color? : 'negative';

  onClick? : () => void;
}

const Button = forwardRef<HTMLDivElement, Props>((props:Props, ref) => {

  // properties
  const { text, size, color } = props;
  const { onClick } = props;

  return (
    <div ref={ref} className={`button ${size ? size : ''} ${color ? color : ''}`} onClick={onClick}>
      {text}
    </div>
  )
})

export default Button;