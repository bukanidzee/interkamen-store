import '../../../static/css/UI/fancyinput.scss'
import cn from 'classnames';
import {forwardRef} from 'react'

const FancyInput = ({inputValue,
                     setInputValue,
                     placeholder,
                     children,
                     ...props}, ref) =>
  <div className='fancy-input'>
    <input type='text'
           className={cn({'filled': inputValue.length > 0})}
           value={inputValue}
           onChange={(event) => setInputValue(event.target.value)}
           {...props}
           {...(ref ? {ref:ref} : {})}/>
    <label>{placeholder}</label>
    {children}
  </div>


export default forwardRef(FancyInput);
