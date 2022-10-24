import {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom';

const CustomNavigate = ({to, replace, state}) => {

  const navigate = useNavigate();

  const isFirstLoading = useRef(true)

  useEffect(() => {
    if (isFirstLoading.current){
      isFirstLoading.current = false
      navigate(to, { replace, state});
    }
  });

  return null;
}

export default CustomNavigate
