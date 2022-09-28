import NavbarComponent from './NavbarComponent';
import Sidebar from './Sidebar';
import {Outlet} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaQuery from 'react-responsive';
import {useUserAgent} from '../../hooks/useUserAgent';
import classnames from 'classnames';

const Navigation = () => {
  const {isBigHeadImg, sidebarVisible, isProductCardSmall} = useUserAgent()
  const topContextMargin = isBigHeadImg ? 150 : 125

  return(
    <div style={{width: '100%'}}>
      <NavbarComponent />
      <Container style={{maxWidth:'inherit'}} className='m-0'>
        <Row>
          <MediaQuery minWidth={sidebarVisible}>
            <Col xl='auto'>
              <div className="sticky-top" style={{zIndex:0}}>
                <Sidebar />
              </div>
            </Col>
          </MediaQuery>
          <Col>
            <div className={classnames('content-box',
                                       {'small-text':!isProductCardSmall})}
                 style={{marginTop: topContextMargin,
                         minHeight: `calc(95vh - ${topContextMargin}px)`}}>
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
