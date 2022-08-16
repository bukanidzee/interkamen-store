import Form from 'react-bootstrap/Form'
import {forwardRef} from 'react'
import FormPreviewImage from './FormPreviewImage'

const FormItem = forwardRef((props, ref) => {

  return(
    <Form.Group className='mb-3'>
      <Form.Label>{props.label}</Form.Label>
      {ref &&
        <FormPreviewImage value={props.value}
                          initialValue={props.initialValue}
                          name={props.name}
                          ref={ref}/>}
      <Form.Control className='mx-auto'
                    type={props.type}
                    placeholder={props.placeholder}
                    {...(!ref ? {value:props.value} : {})}
                    onChange={e => props.setField(props.name,
                                                  {value:e.target.value})}
                    isInvalid={!!props.error}
                    disabled={!!props.disabled}
                    as={props?.as}
                    rows={props?.rows}
                    {...(ref ? {ref:ref} : {})}/>
      <Form.Control.Feedback type='invalid'>
        {props.error}
      </Form.Control.Feedback>
    </Form.Group>
  )
})

export default FormItem;

// <LabeledImage condition={!!ref}
//               label='Действующее изображение'
//               src={props.initialValue}
//               name={props.name}/>
// <LabeledImage condition={!!ref && props.value != props.initialValue}
//               label='Изображение на которое изменяется'
//               name={props.name}
//               ref={previewRef}/>
