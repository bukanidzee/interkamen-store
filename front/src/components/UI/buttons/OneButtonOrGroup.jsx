import ActionButton from './ActionButton';
import classnames from 'classnames'
import '../../../static/css/UI/onebuttonorgroup.css'

const OneButtonOrGroup = ({withMargin, buttons}) =>
  <div className={classnames({'mt-4': withMargin},
                             {'group-of-buttons': buttons.length > 1},
                             {'one-button': buttons.length === 1})}>
    {buttons.map(button =>
      <ActionButton action={button?.action}
                    buttonName={button.name}
                    type={button?.type}
                    form={button?.form}
                    key={button.name}/>)}
  </div>

export default OneButtonOrGroup;
