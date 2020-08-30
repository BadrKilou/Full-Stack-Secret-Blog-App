import React, { useContext } from 'react';
import blogContext from '../../../Context/blogContext';
import authContext from '../../Auth/authContext';
import './BlogsItem.scss'

const BlogsItem = ({ blogs }) => { 
    const BlogContext = useContext(blogContext);
    const { deleteBlog, setCurrent, clearCurrent } = BlogContext 
    const AuthContext = useContext(authContext);
    
    const { user } = AuthContext;

    const { _id, title, author, blog, type } = blogs;

    const onDelete = () => {
      deleteBlog(_id)
      clearCurrent()
    }

    return (
        <div className='container-blog'>
            <div className='bloggin'>
            <h3 className='text-primary'>
             {title}
            <span style={{float: 'right'}}
            className={'badge ' + (type === 'Professional Blog' ? 'badge-success' : 'badge-primary')}
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            </h3>
            <ul className='author'>
                {author}
            </ul>
            <div className='blog-text'>
            <p>{blog}</p>
            </div>
            <p className='wrap-div'> 
                <span style={{float: 'right'}}>
                    Written by 
                <span style={{color: '#82A6E8', marginLeft: '5px'}}>{user && user.name}</span> 
                <i className="fas fa-signature"></i></span>
                
                  <button className='edit-btn' onClick={() => setCurrent(blogs)}>
                  <i className="far fa-edit"></i>Edit</button>
                  <button className='delete-btn' onClick={onDelete}>
                  <i className="fas fa-eraser"></i>Delete</button>
              </p>
            </div>
            
        </div>
    )
}

export default BlogsItem
