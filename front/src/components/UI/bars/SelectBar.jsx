import '../../../static/css/UI/customselect.scss';
import {useState, useEffect, useRef} from 'react';
import cn from 'classnames';

const SelectBar = ({defaultValue, options, value, onChange}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(prev => !prev)
  const selectRef = useRef()

  const mouseEvent = (e) => {
    if (e.target !== selectRef.current && open) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', mouseEvent)
    
    return () => document.removeEventListener('mouseup', mouseEvent)
  })

  return(
  <div className='select-box'>
    <select value={value}
            onChange={(event) => {onChange(event.target.value)}}
            onClick={toggleOpen}
            className={cn('custom-select', {'open': open})}
            ref={selectRef}>
      <option disabled value=''>{defaultValue}</option>
      {options.map((option) =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )}
    </select>
    <div className='triangle'/>
  </div>
  )
}

export default SelectBar;
