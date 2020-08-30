import React,{useState, Fragment, useContext} from 'react';
import Dropdown from './Dropdown';
import authContext from '../../Auth/authContext';
import { NavLink, Link } from 'react-router-dom';
import blogContext from '../../../Context/blogContext'

import './ResponsiveNav.scss';

const ResponsiveNavbar = () => {

    const AuthContext = useContext(authContext);
    const { isAuthenticated, logout, user} = AuthContext

    const BlogContext = useContext(blogContext)

    const { clearBlogs  } = BlogContext

    const onLogout = () => {
        logout();
        clearBlogs()
    }

    const authLinks = (
        <Fragment>
            <li>
                <Link onClick={onLogout} to='/'><span>
                    <i className="fas fa-sign-out-alt"></i>Logout</span></Link>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <ul>
            <li>
            <NavLink to='/'>Home</NavLink>
            </li>
            <li>
            <NavLink to='/about'>About</NavLink>
            </li>
            <li>
            <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
            <NavLink to='/register'>Register</NavLink>
            </li>
            </ul>
        </Fragment>
    )
     
    const [active, setActive] = useState(false)

    const toggleActive = () => {
        setActive(!active)
    }



    return (
        <div className='responsive-navigation'>
            
            <div class="menu-btn">
            <span className={active ? 'hamburger close': 'hamburger'} onClick={toggleActive}><span></span></span>
            
            </div>
            <div className={active ? "nav active close" : 'nav'}>
            
            <ul>
            
            <div className='straight'>
            {isAuthenticated ? authLinks : guestLinks}
            </div>
        </ul>
            </div>          
        </div>
    )
}

export default ResponsiveNavbar

