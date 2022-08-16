import {useAction} from '../hooks/useAction';

const useTransitionStages = () => {
  const {setLoadingFalse, setLoadingTrue} = useAction()

  const onEnter = (node) => {
      node.style.display = 'none';
      setLoadingTrue()
  }

  const onEntered = (node) => {
      node.style.display = 'block';
      setLoadingFalse()
  }

  const onExit = () => {
      setLoadingTrue()
  }

  const onExited = (node) => {
      node.style.display = 'none';
      setLoadingFalse()
  }

  return [onEnter, onEntered, onExit, onExited]
}

export default useTransitionStages;
