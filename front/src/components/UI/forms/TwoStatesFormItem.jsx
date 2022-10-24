import FormItem from './FormItem';
import {CloseButton} from 'react-bootstrap'
import '../../../static/css/UI/closeButton.scss';
import {forwardRef} from 'react'
import {useUserAgent} from '../../../hooks/useUserAgent';
import cn from 'classnames';

const TwoStatesFormItem = forwardRef((props, ref) => {
  const {isProductCardMedium} = useUserAgent()

  const handleCancel = () => {
    props.setField(props.name,
                   {value:props.field.initialValue})
  }

  const notChanged = props.field.value===props.field.initialValue

  return(
    <div className={cn('my-3',
                       {'w-50': isProductCardMedium},
                       {'w-75': !isProductCardMedium},
                       'mx-auto',
                       'position-relative')}>
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
                  {...(ref ? {ref:ref} : {})}
                  notChanged={notChanged}/>
        <CloseButton disabled={notChanged}
                     onClick={handleCancel}
                     className='closeButton'/>

    </div>
  )
})

export default TwoStatesFormItem;
