import '../static/css/pages/contacts.scss';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom';

const Contacts = () =>
    <div>
        <h1 className='page-header'>Предприятие по добыче блочного камня ЗАО "Интеркамень"</h1>
        <div className='main-text'>
          В состав ЗАО Интеркамень входят:
          <ol className='spisok'>
            <li className='element'>Офис</li>
            <li className='element'><Link to='career'>Карьер</Link></li>
            <li className='element'><a href='#'>Цех</a></li>
          </ol>
        </div>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>Должность</th>
              <th>ФИО</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Директор</td>
              <td>Соловей Дмитрий Анатольевич</td>
              <td>78-02-80</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Главный бухгалтер</td>
              <td>Кострубина Елена Алексеевна</td>
              <td>76-49-17</td>
            </tr>
          </tbody>
      </Table>
    </div>;

export default Contacts;
