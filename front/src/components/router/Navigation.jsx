import NavbarComponent from '../NavbarComponent';
import Sidebar from '../Sidebar';
import {Outlet} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Navigation = () => {

  return(
    <div style={{position:'absolute',
                 left: 0,
                 right: 0,
                 height: '100%'}}>
      <NavbarComponent />
      <Container className='m-0'>
        <Row style={{flexWrap:'nowrap'}}>
          <Col sm='auto'>
            <div className="sticky-top" style={{zIndex:0}}>
              <Sidebar />
            </div>
          </Col>
          <Col sm>
            <div className='content-box'>
                <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Navigation;

           // style={{minHeight: `calc(100vh - ${fromDivToTop.current})`}}>
