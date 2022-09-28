import FormItem from './FormItem';
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import OneButtonOrGroup from '../buttons/OneButtonOrGroup';
import {forwardRef, useMemo} from 'react'
import {useUserAgent} from '../../../hooks/useUserAgent';
import classnames from 'classnames';

const TwoStatesFormItem = forwardRef((props, ref) => {
  const {isProductCardMedium} = useUserAgent()

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
    <div className={classnames('my-3',
                               {'w-50': isProductCardMedium},
                               {'w-75': !isProductCardMedium},
                               'mx-auto')}>

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
        <OneButtonOrGroup buttons={buttons} withMargin/>
      </Form>

    </div>
  )
})

export default TwoStatesFormItem;
