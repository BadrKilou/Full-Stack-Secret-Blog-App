import React, { useState, Fragment, useRef } from "react";
import './Dropdown.scss';
import outsideClick from '../../../outsideClick';
import {Link} from 'react-router-dom';

const Dropdown = ({ icon }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const [data] = useState([
        {
            login: 'Login',
            Logout: 'Register',
            more: 'More'
        }
    ])
     const openItems = () => {
         setOpen(!open)
     }
     
     outsideClick(ref, () => {
       if (open) setOpen(false);
     });
    return (
        <div className='dropdown-menu'>
            <div className='menuItem'>
             <i className={icon} onClick={openItems}></i>
             {open && 
             <div ref={ref} className='items'>
              {data.map((item, index) => (
                <div className='keyLinks' key={index}>
               <Link  to='/login'>{item.login}</Link>
               <Link  to='/register'>{item.Logout}</Link>
               <Link  to='/more'>{item.more}</Link>
               </div>
              ))}
             </div>
             }
            </div>
        </div>
    )
}

Dropdown.defaultProps = {
    icon: 'fas fa-ellipsis-v'
}

export default Dropdown
