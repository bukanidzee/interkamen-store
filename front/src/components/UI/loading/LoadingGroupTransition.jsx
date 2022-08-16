import {TransitionGroup} from 'react-transition-group';
import LoadingTransition from './LoadingTransition';

const LoadingGroupTransition = ({transitionKey, ...props}) => {
  return(
    <TransitionGroup>
      <LoadingTransition key={transitionKey}>
        {props.children}
      </LoadingTransition>
    </TransitionGroup>
  )
}

export default LoadingGroupTransition;
