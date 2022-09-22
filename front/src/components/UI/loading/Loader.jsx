import LoaderSpinner from './LoaderSpinner';

const Loader = ({fromTop}) =>
  <div style={{
              position:'relative',
              top: `${fromTop}%`,
              display:'flex',
              justifyContent:'center'}}>
    <LoaderSpinner />
  </div>


export default Loader
