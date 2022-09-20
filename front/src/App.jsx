import React, { useEffect } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/app.css';
// import '../public/favicon.ico'
import AppRouter from './components/router/AppRouter';
import ModalLoader from './components/UI/modal/ModalLoader';
import Errors from './components/UI/errors/Errors';
import {useAPI} from './hooks/useAPI';
import {getCurrentOrder} from './utils/authData';

import {useAction} from './hooks/useAction';


const App = () => {
  const {login, setLoadingFalse, setOrder} = useAction()
  const navigate = useNavigate()
  const location = useLocation()
  const fullname = useSelector(state => state.auth.fullname)

  const getOrder = useAPI( async (is_staff) => {
    console.log('getOrder called')
    await getCurrentOrder(is_staff, setOrder).then(() => {
      login({fullname:localStorage.getItem('fullname'),
             is_staff:is_staff,
             userId:localStorage.getItem('userId')})
    }).finally(() =>{
      setLoadingFalse();
    })
  })

  useEffect(() => {
    if (location.state && fullname){
      navigate(location.state)
    }
  }, [location.state, fullname])

  useEffect(() => {
    let authKey = localStorage.getItem('authKey')
    if (authKey) {
      axios.defaults.headers.common['Authorization'] = authKey
      let is_staff = localStorage.getItem('is_staff')
      getOrder(is_staff === 'true' ? true : false) 
    } else {
      setLoadingFalse();
    }
  }, [])

  return (
    <>
      <ModalLoader />
      <Errors />
      <AppRouter/>
    </>

  );
};

export default App
