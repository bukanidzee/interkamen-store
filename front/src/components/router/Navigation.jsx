import NavbarComponent from './NavbarComponent';
import Sidebar from './Sidebar';
import {Outlet} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaQuery from 'react-responsive';


const Navigation = () => {

  return(
    <div style={{width: '100%'}}>
      <NavbarComponent />
      <Container style={{maxWidth:'inherit'}} className='m-0'>
        <Row style={{flexWrap:'nowrap'}}>
          <MediaQuery minWidth={1200}>
            <Col xl='auto'>
              <div className="sticky-top" style={{zIndex:0}}>
                <Sidebar />
              </div>
            </Col>
          </MediaQuery>
          <Col>
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
