import {Transition} from 'react-transition-group';
import useTransitionStages from '../../../hooks/useTransitionStages';

const LoadingTransition = ({ ...props }) => {
  const [onEnter, onEntered, onExit, onExited] = useTransitionStages();

  return(
      <Transition
        in = {props.in}
        timeout ={600}
        onEnter = {onEnter}
        onEntered = {onEntered}
        onExit = {onExit}
        onExited = {onExited}>
        {props.children}
      </Transition>
  )
}

export default LoadingTransition;
