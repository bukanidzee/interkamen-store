import Loader from './Loader';

const LoadingThenContent = ({...props}) =>
  <>
    {props.isLoading ?
      <Loader />
    :
      props.children
    }
  </>


export default LoadingThenContent;
