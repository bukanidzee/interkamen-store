const Home = () =>
    <div>
      <h1 className='page-header'>Предприятие по добыче блочного камня ЗАО "Интеркамень"</h1>
        <div className='main-text'>
          В состав ЗАО Интеркамень входят:
          <ol className='spisok'>
            <li className='element'>Офис</li>
            <li className='element'><a href='#'>Карьер</a></li>
            <li className='element'><a href='#'>Цех</a></li>
          </ol>
        </div>
        <div className='main-text'>
          В состав управления ЗАО Интеркамень входят:
          <ol className='spisok'>
            <li className='element'>Директор:
              <ol className='spisok'>
                <li className='element'>Соловей Дмитрий Анатольевич</li>
              </ol>
            </li>
            <li className='element'>Главный инженер:
              <ol className='spisok'>
                <li className='element'>Кострубин Константин Сергеевич</li>
              </ol>
            </li>
            <li className='element'>Главный бухгалтер:
              <ol className='spisok'>
                <li className='element'>Кострубина Елена Алексеевна</li>
              </ol>
            </li>
          </ol>
      </div>
    </div>;

export default Home;
