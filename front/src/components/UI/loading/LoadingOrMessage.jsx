import Loader from './Loader';

const LoadingOrMessage = ({...props}) =>
  <>
  {props.condition ?
    <>
      {props.children}
      {props.isLoading &&
          <div style={{
                      display:'flex',
                      justifyContent:'center',
                      marginTop: 50}}>
            <Loader />
          </div>
        }
    </>
    :
      props.isLoading ?
        <div style={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop: 50}}>
          <Loader />
        </div>
      :
        <h1 className='h1-center'>{props.message}</h1>
    }
  </>

export default LoadingOrMessage;
