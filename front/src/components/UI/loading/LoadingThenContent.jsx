import Loader from './Loader';

const LoadingThenContent = ({...props}) =>
  <>
    {props.isLoading ?
      <Loader fromTop='50%'/>
    :
      props.children
    }
  </>


export default LoadingThenContent;
