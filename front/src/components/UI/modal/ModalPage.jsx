import '../../../static/css/UI/modalpage.scss';

const ModalPage = ({classes, ...props}) => {

  return(
    <div onClick={props?.setVisible ? () => props.setVisible(false) : undefined}
         className={classes}>
      {props.children}
    </div>
  )
}

export default ModalPage;
