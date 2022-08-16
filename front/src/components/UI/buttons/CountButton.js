import '../../../static/css/UI/countbutton.css';
// import {useState} from 'react';

const CountButton = ({count, setCount}) => {
  const increment = () =>
    setCount(parseInt(count)+1)

  const decrement = () => {
    if (count > 1) {
      setCount(parseInt(count)-1)
    }
  }

  const insertNumber = (event) => {
    if (!event.target.value) {
      setCount(event.target.value)
    } else if (event.target.value < 1) {
      setCount(1)
    } else if (event.target.value <= 99) {
      setCount(event.target.value)
    }
  }

  const fillEmpty = (event) => {
    if (!event.target.value) {
      setCount(1)
    }
  }

  return(
    <div className='countbutton-box'>
      <div className='triangle-left' onClick={decrement}></div>
      <input type='number'
             min={1}
             max={99}
             value={count}
             onChange={insertNumber}
             onBlur={fillEmpty}/>
      <div className='triangle-right' onClick={increment}></div>
    </div>
  )
}

export default CountButton;
