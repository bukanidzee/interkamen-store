import React from 'react';
import '../../../static/css/UI/loader.css';

/**
 * See https://www.npmjs.com/package/loaders.css for more info
 * @method Loader
 */
const Loader = () => {
  return(
    <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx={25} cy={25} r={20} fill="none" strokeWidth={5}/>
    </svg>
  )
};

export default Loader;
