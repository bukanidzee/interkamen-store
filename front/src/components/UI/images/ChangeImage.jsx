import {forwardRef} from 'react'
import LabeledImage from './LabeledImage'


const ChangeImage = forwardRef((props, ref) => {
  return(
    <>
      <LabeledImage condition={true}
                    label='Действующее изображение'
                    src={props.initialValue}
                    name={'initial_' + props.name}/>
      <LabeledImage condition={props.value != props.initialValue}
                    label='Изображение на которое изменяется'
                    name={'new_' + props.name}
                    ref={ref}/>
    </>
  )
})

export default ChangeImage
