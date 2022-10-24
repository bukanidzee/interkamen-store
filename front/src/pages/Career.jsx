import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import FancyPicture from '../static/images/fancy_picture.png'

const Career = () => {
  return (
  <Container fluid>
    <Row>
      <h1 className='page-header'>Общая информация о карьере Другорецкий-3</h1>
    </Row>
    <Row>
      <Col sm={6} xl={8}>
        <article className='main-text'>
          <p>Месторождение габбро-диабаза Другорецкое-3 расположено в 1.1 км
          к юго-востоку от окраины п. Другая река. В административном отношении
          участок работ находится в Прионежском районе Республики Карелия.
          Географические координаты центра участка 61014’50’’с.ш., 35034’15’’в.д.</p>
          <hr/>
          <p>В 220 м севернее участка проходит шоссейная автодорога
          “Петрозаводск-Ошта”. До г. Петрозаводск от карьера 103,5 км. Ближайшая
           пристань находится на берегу Онежского озера в пос. Рыбрека в 6 км от
            карьера, ближайшая железнодорожная станция находится в 91 км от
            карьера (тупик от ст. Деревянка)</p>
        </article>
      </Col>
      <Col sm={6} xl={4}>
        <img className='in-box-image'
             src={FancyPicture}
             alt='fancy_picture'/>
      </Col>
    </Row>
  </Container>
  )
}

export default Career;
