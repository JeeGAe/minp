import React, {ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef} from 'react';
import './style.css';

interface Props {
  label : string;
  type : 'text' | 'password';
  placeholder : string;
  value : string;
  onChange? : (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown? : (event: KeyboardEvent<HTMLInputElement>) => void;

  error? : boolean;
  message? : string;

  readOnly? : boolean;
  onClick? : () => void;
}

const InputBox = forwardRef<HTMLInputElement, Props>((props:Props, ref) => {

  // properties
  const { label, type, placeholder, value, error, message, readOnly } = props;
  const { onChange, onClick, onKeyDown } = props;

  return (
    <div className='input-box'>
      <div className='input-box-label'>{label}</div>
      <div className={`input-box-container ${error && 'error'}`}>
        <input ref={ref} className='input' type={type} placeholder={placeholder} value={value} onChange={onChange} readOnly={readOnly ? true : false} onClick={onClick} onKeyDown={onKeyDown}/>
      </div>
      {error && message &&
      <div className='input-box-error-message'>{message}</div>
      }
    </div>
  )
})

export default InputBox;
