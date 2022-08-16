import ActionButton from './ActionButton';
import {useMemo} from 'react'
import '../../../static/css/UI/onebuttonorgroup.css'

const OneButtonOrGroup = ({withMargin, buttons}) => {
  const buttonsComponents = useMemo(() => {
    return buttons.map(button =>
      <ActionButton action={button?.action}
                    buttonName={button.name}
                    type={button?.type}
                    form={button?.form}
                    key={button.name}/>)
  }, [buttons])

  const classes = useMemo(() => {
    const classArray = []
    if (withMargin){
      classArray.push('mt-4')
    }

    if (buttons.length > 1){
      classArray.push('group-of-buttons')
    } else {
      classArray.push('one-button')
    }
    return classArray
  }, [buttons])
  
  return (
    <div className={classes.join(' ')}>
      {buttonsComponents}
    </div>
  )
}

export default OneButtonOrGroup;

// <div className={classes.join(' ')}>
//   {buttons}
// </div>
