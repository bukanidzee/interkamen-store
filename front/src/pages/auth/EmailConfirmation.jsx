import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import LoadingThenContent from '../../components/UI/loading/LoadingThenContent';

const EmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const {key} = useParams()

  const confirmEmail = useAPI(async () => {
    await UserService.emailConfirm(key, () => {
      setIsSuccessfully(true)
    })
  }, setIsLoading)

  useEffect(() =>{
    confirmEmail()
  }, [])

  return (
    <LoadingThenContent isLoading={isLoading}>
      {isSuccessfully ?
          <>
            <h1 className='page-header'>Успешно!</h1>
            <div className='main-text'>
              Ваш Email успешно подтвержден!
            </div>
          </>
        :
          <>
            <h1 className='page-header'>Неудача!</h1>
            <div className='main-text'>
              К сожалению при попытке подтвердить ваш email произошла ошибка!
              Пожалуйста проверьте ссылку, по которой вы перешли.
              Возможно в ней ошибка.
            </div>
          </>
       }
    </LoadingThenContent>
  )
}

export default EmailConfirmation
