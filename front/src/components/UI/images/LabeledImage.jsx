import ImageInBox from './ImageInBox';
import {forwardRef} from 'react'

const LabeledImage = forwardRef((props, ref) => {
  return(
    <>
      {props.condition &&
        <div className='mb-4'>
          {props.label}:
          <ImageInBox src={props.src || '#'}
                      name={props.name}
                      {...(ref ? {ref:ref} : {})}/>
        </div>}
    </>
  )
})

export default LabeledImage
