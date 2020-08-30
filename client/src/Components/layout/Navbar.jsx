import React, {useState, useContext, Fragment} from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.scss';
import Dropdown from './pages/Dropdown';
import authContext from '../Auth/authContext';
import blogContext from '../../Context/blogContext';
import ResponsiveNavbar from './pages/ResponsiveNavbar';
import useWindowScrollPosition from '@rehooks/window-scroll-position';

const Navbar = ({ title, icon }) => {
    const AuthContext = useContext(authContext);
    const { isAuthenticated, logout, user} = AuthContext

    const BlogContext = useContext(blogContext)

    const { clearBlogs  } = BlogContext

    const onLogout = () => {
        logout();
        clearBlogs()
    }

  
        const [change, setChanger] = useState(false)
        const changePosition = 200

        let position = useWindowScrollPosition();

        if(position.y > changePosition && !change){
            setChanger(true)
        }
        if(position.y <= changePosition && change){
            setChanger(false)
        }

        let style = {
            backgroundColor: change ? '#91A2F5' : "#5A6599",
            transition: "500ms ease",
            position: "fixed",
            right: 0,
            left: 0,
            top: 0
          };
        
    
    
    
    
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
            <NavLink to='/about'>About</NavLink>
            <Dropdown />
            </li>
            </ul>
        </Fragment>
    )

    return (
        <div className='navigation'  style={style}>
     
            <div className='navbar'>
               
             <Link className='logo' to="/">
                 {title}
             </Link>
              <div className='mobile-only'>
              <ResponsiveNavbar  />
              <Link className='bimo' to="/">
                 {title}
             </Link>
              </div>
             
             
             <div className='nav-links'>
                {isAuthenticated ? authLinks : guestLinks}
             </div>
             
            </div>
        </div>
    )
}
Navbar.defaultProps = {
    title: 'Blognex App',
    icon: 'fas fa-blog'
}

export default Navbar
