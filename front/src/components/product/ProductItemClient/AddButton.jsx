import Button from 'react-bootstrap/Button';

const AddButton = ({fetchItem}) => {
  return(
    <Button variant="outline-secondary"
            onClick={async () => await fetchItem('addItem')}>
      Добавить в корзину
    </Button>
  )
}

export default AddButton
