import '../static/css/pages/rock_properties.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const RockProperties = () =>
<Container>
  <Row className='row justify-content-center'>
    <h1 className='page-header'>Свойства габбродиабаза</h1>
  </Row>
  <Row className='justify-content-center'>
    <table width='100%'>
    <caption>Таблица физико-механические свойства габбродиабаза</caption>
    <colgroup>
      <col span='1' style={{background: 'Khaki'}}/>
      <col span='3' style={{background: 'white'}}/>
    </colgroup>
      <thead>
        <tr>
          <th>№ пп</th>
          <th>Свойство</th>
          <th>Единица измерения</th>
          <th>Значение</th>
        </tr>
      </thead>
      <tfoot>
        <tr style={{borderColor: 'white'}}>
          <td colSpan='3' className='conclusion'>ИТОГО СВОЙСТВ:</td><td>12</td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>1</td>
          <td>Предел прочности при сжатии в сухом состоянии</td>
          <td>МПа</td>
          <td>342</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Предел прочности при сжатии в водонасыщенном состоянии</td>
          <td>МПа</td>
          <td>334</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Снижение прочности при сжатии породы при водонасыщении</td>
          <td>%</td>
          <td>2,3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Предел прочности при сжатии после 50 циклов замораживания-оттаивания</td>
          <td>МПа</td>
          <td>252</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Снижение прочности при сжатии породы после 50 циклов мороза</td>
          <td>МПа</td>
          <td><ins>5,65-30,0</ins><br/>17,9</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Морозостойкость</td>
          <td>-</td>
          <td>МРЗ 50</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Средняя плотность</td>
          <td>г/см<sup>3</sup></td>
          <td>2.98</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Истинная плотность</td>
          <td>г/см<sup>3</sup></td>
          <td>3.00</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Водопоглощение</td>
          <td>%</td>
          <td>0.02</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Пористость</td>
          <td>%</td>
          <td>0.47</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Истираемость</td>
          <td>г/см<sup>3</sup><br/>мм</td>
          <td>0,2<br/>0,73</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Сопротивление удару</td>
          <td>усл. ед</td>
          <td>51</td>
        </tr>
      </tbody>
    </table>
  </Row>
</Container>;

export default RockProperties;
