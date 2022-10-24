import {Container, Row, Col} from 'react-bootstrap';

export const RowOrColumnChoise = ({isGrid, children}) => {

  return(
    <Container className='product-item-card' fluid>
      {!isGrid ?
        <Row>
          {children}
        </Row>
      :
        <Row>
          <Col style={{display:'flex',
                       flexDirection:'column',
                       justifyContent:'center',
                       rowGap:20}}>
            {children}
          </Col>
        </Row>
      }
    </Container>
  )
}

export default RowOrColumnChoise;
