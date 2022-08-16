import Loader from './Loader';

const LoadingThenContent = ({...props}) =>
  <>
    {props.isLoading ?
      <div className='d-flex justify-content-center mt-5'>
        <Loader />
      </div>
    :
      props.children
    }
  </>


export default LoadingThenContent;
