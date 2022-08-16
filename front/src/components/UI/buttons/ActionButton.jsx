import Button from 'react-bootstrap/Button'

const ActionButton = ({action, buttonName, type, form}) => {
  // const actionClick = () => action()
  return (
      <Button variant='primary'
              onClick={action}
              type={type}
              form={form}
              >
        {buttonName}
      </Button>
  )
}

export default ActionButton;

// onClick={action && actionClick}
