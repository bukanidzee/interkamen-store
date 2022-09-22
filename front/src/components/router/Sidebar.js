import React from 'react';
import '../../static/css/components/sidebar.css';
import {Link} from 'react-router-dom';
import {navLinks} from '../../navigation/navLinks';

const Sidebar = () =>
  <div className='aside'>
    {navLinks.map((bar) =>
      <div key={bar.title}>
        {bar.title}
        <nav className='menu'>
          <ul>
            {bar.links.map((link) =>
              <li key={link.name}>
                <Link to={link.to}>
                  {link.name}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    )}
  </div>

export default Sidebar;


// <div className='asideCol'>
//   <div className='aside'>
//     {navLinks.map((bar) =>
//       <div key={bar.title}>
//         {bar.title}
//         <nav className='menu'>
//           <ul>
//             {bar.links.map((link) =>
//               <li key={link.name}>
//                 <Link to={link.to}>
//                   {link.name}
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </nav>
//       </div>
//     )}
//   </div>
// </div>
