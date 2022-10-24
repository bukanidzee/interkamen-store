const Home = () =>
    <div>
      <h1 className='page-header'>Предприятие по добыче блочного камня ЗАО "Интеркамень"</h1>
        <div className='main-text'>
          В состав ЗАО Интеркамень входят:
          <ol className='spisok'>
            <li>Офис</li>
            <li><a href='#'>Карьер</a></li>
            <li><a href='#'>Цех</a></li>
          </ol>
        </div>
        <div className='main-text'>
          В состав управления ЗАО Интеркамень входят:
          <ol className='spisok'>
            <li>Директор:
              <ol className='spisok'>
                <li>Соловей Дмитрий Анатольевич</li>
              </ol>
            </li>
            <li>Главный инженер:
              <ol className='spisok'>
                <li>Кострубин Константин Сергеевич</li>
              </ol>
            </li>
            <li>Главный бухгалтер:
              <ol className='spisok'>
                <li>Кострубина Елена Алексеевна</li>
              </ol>
            </li>
          </ol>
      </div>
    </div>;

export default Home;
