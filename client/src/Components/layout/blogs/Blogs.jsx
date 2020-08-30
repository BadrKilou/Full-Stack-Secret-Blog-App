import React, { useContext, Fragment, useEffect } from 'react';
import blogContext from '../../../Context/blogContext';
import BlogsItem from './BlogsItem';
import Spinner from '../../Spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Blogs.scss';

   
const Blogs = () => {  
    const BlogsContext = useContext(blogContext);

     
    const { blogs, filtered, loading, getBlogs} = BlogsContext; 

    useEffect(() => {
        getBlogs()
        // eslint-disable-next-line
    }, [])

    if(blogs !== null && blogs.length === 0 && !loading){
        return <h4>Start Adding some Blogs !!</h4>
    }

    return (  
        <Fragment>
             {blogs !== null && !loading ?
             (
                <TransitionGroup>
                {filtered !== null ? filtered.map(blog =>
                (
                <CSSTransition key={blog._id} timeout={500} classNames='item'>
                <BlogsItem  blogs={blog}/>
                </CSSTransition>
                )) : blogs.map(blog => 
                (
                <CSSTransition key={blog._id} timeout={500} classNames='item'>
                 <BlogsItem  blogs={blog}/>
                 </CSSTransition>
                )
                )}
                </TransitionGroup>
             ): <Spinner />}
                    
            
        </Fragment>
    )
}

export default Blogs
