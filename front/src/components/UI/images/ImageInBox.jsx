import {forwardRef} from 'react'

const ImageInBox = forwardRef((props, ref) =>
  <img src={props.src}
       className = 'in-box-image'
       alt={`${props.name}_image`}
       {...(ref ? {ref:ref} : {})}/>
)

export default ImageInBox
