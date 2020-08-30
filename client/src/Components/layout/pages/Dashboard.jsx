import React, { Fragment, useContext, useEffect } from 'react';
import Blogs from '../blogs/Blogs';
import BlogForm from '../blogs/BlogForm';
import BlogFilter from '../blogs/BlogFilter';
import authContext from '../../Auth/authContext';
import './Dashboard.scss'

const Dashboard = () => {
    const AuthContext = useContext(authContext);

    const { loadUser } = AuthContext

    useEffect(() => {
     loadUser()
    }, [])
    
    return (
        
            <div className='grid'>
            <div>
             <BlogForm />
            </div>
            <div>
            <BlogFilter />
           <Blogs />
           </div>
           </div>

    )
}

export default Dashboard;