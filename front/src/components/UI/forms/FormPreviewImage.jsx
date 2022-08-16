import {forwardRef} from 'react'
import {usePreviewImage} from '../../../hooks/usePreviewImage';
import ChangeImage from '../images/ChangeImage'
import LabeledImage from '../images/LabeledImage'

const FormPreviewImage = forwardRef((props, ref) => {
  const previewRef = usePreviewImage(props.value, props.initialValue, ref)

  return (
    <>
      {props.initialValue ?
        <ChangeImage value={props.value}
                     initialValue={props.initialValue}
                     name={props.name}
                     ref={previewRef}/>
      :
        <LabeledImage condition={props.value}
                      label='Предварительный просмотр'
                      name={'new_' + props.name}
                      ref={previewRef}/>}
    </>
  )
})

export default FormPreviewImage
