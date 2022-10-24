import {forwardRef} from 'react'
import {formsFields} from '../../../utils/forms/formsFields'
import LoadingThenContent from '../loading/LoadingThenContent';
// import OneButtonOrGroup from '../buttons/OneButtonOrGroup';
import TwoStatesFormItem from './TwoStatesFormItem';
import {Form, Button} from 'react-bootstrap'

const ChangeForm = forwardRef((props, ref) => {
  const formChanged = !!Object.keys(props.form).find((name) => {
    return props.form[name].initialValue !== props.form[name].value
  })
  return(
  <div className='d-flex flex-column'>
    {props.condition &&
      <LoadingThenContent isLoading={props.isLoading}>
        {props.header &&
          <h1 className='page-header'>{props.header}</h1>}
        <Form onSubmit={props.onSubmit}
              className='d-flex flex-column justify-content-center'>
        {Object.keys(props.form).map((name) =>
            <TwoStatesFormItem onSubmit={props.onSubmit}
                               label={formsFields[name].label}
                               placeholder={formsFields[name].placeholder}
                               type={formsFields[name].type}
                               field={props.form[name]}
                               name={name}
                               as={formsFields[name]?.as}
                               rows={formsFields[name]?.rows}
                               setField={props.setField}
                               error={props.errors[name]}
                               key={name}
                               {...(formsFields[name].type === 'file' ?
                                      {ref:ref}:
                                      {})}
                               />)}
          <Button type='submit'
                  className='mx-auto'
                  disabled={!formChanged}>Подтвердить</Button>
        </Form>
      </LoadingThenContent>
    }
  </div>
  )
})

export default ChangeForm
