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
  const {isBigHeadImg,
         sidebarVisible,
         isSidebarVisible,
         isProductCardSmall} = useUserAgent()
  const topContentMargin = isSidebarVisible ? 50 : isBigHeadImg ? 150 : 125
  const fromContentToTop = isSidebarVisible ? 150 : topContentMargin

  return(
    <div style={{width: '100%'}}>
      <NavbarComponent />
      <Container style={{maxWidth:'inherit'}} className='m-0'>
        <Row>
          <MediaQuery minWidth={sidebarVisible}>
            <Col xl='auto'>
              <div className="sticky-top"
                   style={{  display: 'flex',
                             flexDirection: 'column',
                             justifyContent: 'flex-end',
                             height: `60vh`,
                             zIndex: 500,}}>
                <Sidebar />
              </div>
            </Col>
          </MediaQuery>
          <Col style={{zIndex:1000}}>
            <div id='content-box' className={classnames({
                                              'small-text':!isProductCardSmall})}
                 style={{marginTop: topContentMargin,
                         minHeight: `calc(95vh - ${fromContentToTop}px)`}}>
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
