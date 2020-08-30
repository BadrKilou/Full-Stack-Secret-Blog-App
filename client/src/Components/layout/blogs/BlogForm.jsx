import React, {useContext, useEffect} from 'react';
import blogContext from '../../../Context/blogContext';
import { useState } from 'react';
import {useAlert} from 'react-alert';
import './BlogForm.scss'

const BlogForm = () => {
    const BlogContext = useContext(blogContext);
    const {addBlog , current, clearCurrent, UpdateBlog} = BlogContext

    useEffect(() => {
        if(current !== null){
            setBlogs(current)
        } else {
            setBlogs({
                title: '',
                author: '',
                blog: '',
                type: 'Personal Blog'
            })
        }
    }, [blogContext, current])
    
    const alert = useAlert()

    const [blogs, setBlogs] = useState({
        title: '',
        author: '',
        blog: '',
        type: 'Personal Blog'
    });
    const { title, author, blog, type } = blogs

    const onChange = e => {
     setBlogs({ ...blogs, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        if(title === '' || author ==='' || blog === ''){
            alert.error('You need to fill in all fields')
            return true;
        } 
         if(current === null){
            addBlog(blogs);
            alert.success('Blog Added Successfully')
        } else{
            UpdateBlog(blogs)
        }
        setBlogs({
            title: '',
            author: '',
            blog: '',
            type: 'Personal Blog'
        })
        
    }
    
    const clearAll = () => {
        clearCurrent()
    }

    return (
        <div className='form-blog'>
            <form className='form' onSubmit={onSubmit}>
                
                <h2 className='thoughts'>
                    {current ? 'EDITING MODE' : 'What are your thoughts Today ?'}
                </h2>
                <input type="text" 
                className='input-field'
                placeholder='title name ...'
                name='title'
                value={title}
                onChange={onChange}
                />
                 <input type="text" 
                className='input-field'
                placeholder='author name ...'
                name='author'
                value={author}
                onChange={onChange}
                />
                 <textarea type="text" 
                className='text-area'
                placeholder='blog ...'
                name='blog'
                value={blog}
                onChange={onChange}
                />
                <h5 className='user-type'>BLOG TYPE</h5>
                <div className='type-user'>
                <input type="radio"
                name='type'
                value='Personal Blog'
                checked={type === 'Personal Blog'}
                onChange={onChange}
                /> Personal Blog {''}
 
                <input type="radio"
                name='type'
                value='Professional Blog'
                checked={type === 'Professional Blog'}
                onChange={onChange}        
                /> Professionnal Blog {''}
                </div>
                <div className='submit-btn'>
                 <button className='cta-btn' type="submit" value={current ? 'Update Blog' : 'Add Blog'}>
                     Add Blog
                     </button>
                 {current && (
                <div className='clear-current'>
                  <button className='clearing-btn' onClick={clearAll}>Clear</button>
                 </div>
                 )}
                 
                </div>
            </form>
            
        </div>
    )
}

export default BlogForm
