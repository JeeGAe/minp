import React, {ChangeEvent, Dispatch, SetStateAction, forwardRef} from 'react';
import './style.css';

interface Props {
  label : string,
  type : 'text' | 'password',
  placeholder : string,
  value : string,
  setValue : Dispatch<SetStateAction<string>>,

  error : boolean,
  message : string,

  readOnly? : boolean
  onClick? : () => void
}

const InputBox = forwardRef<HTMLInputElement, Props>((props:Props, ref) => {

  // properties
  const { label, type, placeholder, value, error, message, readOnly } = props;
  const { setValue, onClick } = props;

  // 이벤트 처리 함수
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  }


  return (
    <div className='input-box'>
      <div className='input-box-label'>{label}</div>
      <div className={`input-box-container ${error && 'error'}`}>
        <input className='input' type={type} placeholder={placeholder} value={value} onChange={onChangeHandler} readOnly={readOnly ? true : false} onClick={onClick} />
      </div>
      <div className='input-box-error-message'>{message}</div>
    </div>
  )
})

export default InputBox;
