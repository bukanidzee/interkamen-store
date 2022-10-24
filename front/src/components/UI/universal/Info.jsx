import '../../../static/css/UI/info.scss'

const Info = ({description, message}) => {
  return(
    <div className='info'>
      <span>{description}:&nbsp;</span>
      <span>{message}</span>
    </div>
  )
}

export default Info
