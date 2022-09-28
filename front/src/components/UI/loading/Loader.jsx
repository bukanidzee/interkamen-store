import LoaderSpinner from './LoaderSpinner';

const Loader = ({fromTop}) =>{
  return(
  <div style={{
              position:'relative',
              width:'100%',
              top: fromTop,
              display:'flex',
              justifyContent:'center'}}>
    <LoaderSpinner />
  </div>
  )
}

export default Loader
