import {forwardRef} from 'react'
import {formsFields} from '../../../utils/forms/formsFields'
import LoadingThenContent from '../loading/LoadingThenContent';
import TwoStatesFormItem from './TwoStatesFormItem';

const ChangeForm = forwardRef((props, ref) =>
  <div className='d-flex flex-column w-100'>
    {props.header &&
      <h1 className='page-header'>{props.header}</h1>}
    {props.condition &&
      <LoadingThenContent isLoading={props.isLoading}>
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
      </LoadingThenContent>
    }
  </div>
)

export default ChangeForm
