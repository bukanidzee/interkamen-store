import React from 'react';
import '../../static/css/components/sidebar.scss';
import {Link} from 'react-router-dom';
import {navLinks} from '../../navigation/navLinks';

const Sidebar = () =>
  <div id='aside'>
    {navLinks.map((bar) =>
      <div key={bar.title}>
        <header>{bar.title}</header>
        <nav className='menu'>
          {bar.links.map((link) =>
            <Link to={link.to} key={link.name}>
              {link.name}
            </Link>
          )}
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
