import React, { useEffect } from 'react';
import axios from 'axios';
import './static/css/app.scss';
import AppRouter from './components/router/AppRouter';
import ModalLoader from './components/UI/modal/ModalLoader';
import Errors from './components/UI/errors/Errors';
import {useAPI} from './hooks/useAPI';
import {getCurrentOrder} from './utils/authData';

import {useAction} from './hooks/useAction';


const App = () => {

  const {login, setLoadingFalse, setLoadingTrue, setOrder} = useAction()

  const getOrder = useAPI( async (is_staff) => {
    setLoadingTrue()
    await getCurrentOrder(is_staff, setOrder).then(() => {
      login({fullname:localStorage.getItem('fullname'),
             is_staff:is_staff ? 'true' : 'false',
             userId:localStorage.getItem('userId')})
    }).finally(() =>{
      setLoadingFalse();
    })
  })

  useEffect(() => {
    const authKey = localStorage.getItem('authKey')
    if (authKey) {
      axios.defaults.headers.common['Authorization'] = authKey
      const is_staff = localStorage.getItem('is_staff')
      getOrder(is_staff === 'true' ? true : false)
    } else {
      setLoadingFalse();
    }
  }, [])

  return (
    <>
      <div id='modal'>
        <ModalLoader />
      </div>
      <Errors />
      <AppRouter/>
    </>

  );
};

export default App
