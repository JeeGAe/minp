
import './style.css';

interface Props {
  text : string;
  size? : 'wide';

  onClick? : () => void;
}

const Button = (props:Props) => {

  // properties
  const { text, size } = props;
  const { onClick } = props;

  return (
    <div className={`button ${size ? size : ''}`} onClick={onClick}>
      {text}
    </div>
  )
}

export default Button;