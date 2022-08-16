import FormItem from './FormItem';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {formsFields} from '../../../utils/forms/formsFields';
import {forwardRef} from 'react'

const RegularForm = forwardRef((props, ref) => {
  return(
    <div className='d-flex flex-column'>
      {props.header &&
        <h1 className='page-header'>{props.header}</h1>}
      <Form onSubmit={props.onSubmit} className='d-flex flex-column w-50 mx-auto'>
        {Object.keys(props.form).map(field =>
          <FormItem label={formsFields[field].label}
                    type={formsFields[field].type}
                    value={props.form[field]}
                    placeholder={formsFields[field].placeholder}
                    name={field}
                    setField={props.setField}
                    error={props.errors[field]}
                    as={formsFields[field]?.as}
                    rows={formsFields[field]?.rows}
                    key={field}
                    {...(ref && formsFields[field].type === 'file' ?
                      {ref: ref} :
                      {})}/>
        )}
        <Button type='submit'
                variant='secondary'
                className='mx-auto'>
          {props.submitName}
        </Button>
      </Form>
    </div>
  )
})

export default RegularForm
