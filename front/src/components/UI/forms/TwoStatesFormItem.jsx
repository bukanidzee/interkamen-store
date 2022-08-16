import FormItem from './FormItem';
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import OneButtonOrGroup from '../buttons/OneButtonOrGroup';
import {forwardRef, useMemo} from 'react'

const TwoStatesFormItem = forwardRef((props, ref) => {
  const buttons = useMemo(() => {
    return props.field.state === 'notActive' ?
      [{name: 'Изменить',
        type: 'button',
        action: () => {
          props.setField(props.name, {state:'active'})}}
      ]
    :
      [{name: 'Подтвердить',
        type: 'submit',
        form: `form-${props.name}`},
       {name: 'Отменить',
        type: 'button',
        action: () => {
          props.setField(props.name, {value:props.field.initialValue,
                                      state:'notActive'})}}
      ]
  }, [props.field])

  return(
    <div className='mb-2 w-50 mx-auto'>

      <Form onSubmit={props.onSubmit}
            id={`form-${props.name}`}>
        <FormItem label={`${props.label}:`}
                  type={props.type}
                  placeholder={props.placeholder}
                  value={props.field.value}
                  {...(ref ? {initialValue:props.field.initialValue} : {})}
                  name={props.name}
                  as={props?.as}
                  rows={props?.rows}
                  setField={props.setField}
                  error={props.error}
                  disabled={props.field.state === 'notActive'}
                  {...(ref ? {ref:ref} : {})}/>
      </Form>
      <OneButtonOrGroup buttons={buttons} withMargin/>
    </div>
  )
})

export default TwoStatesFormItem;

// as={props.field.state === 'notActive' ? 'div': 'input' }
// <Button variation='primary'
//         type="button"
//         onClick={() => {
//           props.reverseFieldState(props.name)
//           return false
//         }}>
//   Изменить
// </Button>


// {props.field.state === 'notActive' ?
//    <div className='d-flex justify-content-end'>
//      <button type="button"
//              className="btn btn-primary"
//              onClick={() => {
//                props.setField(props.name, {state:'active'})
//              }}>
//        Изменить
//      </button>
//    </div>
//  :
//    <div className='d-flex justify-content-between'>
//      <Button variation='primary'
//              type="submit"
//              form={`form-${props.name}`}>
//        Подтвердить
//      </Button>
//      <Button variation='primary'
//              type="button"
//              onClick={() => {
//                props.setField(props.name, {value:props.field.initialValue,
//                                            state:'notActive'})
//              }}>
//        Отменить
//      </Button>
//    </div>
// }
