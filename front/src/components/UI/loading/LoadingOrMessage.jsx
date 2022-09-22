import Loader from './Loader';

const LoadingOrMessage = ({...props}) =>
  <>
  {props.condition ?
    <>
      {props.children}
      {props.isLoading &&
          <Loader fromTop='10'/>
        }
    </>
    :
      props.isLoading ?
        <Loader fromTop='50'/>
      :
        <h1 className='h1-center'>{props.message}</h1>
    }
  </>

export default LoadingOrMessage;
