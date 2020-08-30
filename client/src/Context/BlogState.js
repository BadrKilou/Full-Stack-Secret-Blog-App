import React, { useReducer } from 'react';
import blogContext from './blogContext';
import BlogReducer from './BlogReducer';
import axios from 'axios';

import {
    ADD_BLOG,
    DELETE_BLOG,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BLOG,
    FILTER_BLOGS,
    CLEAR_FILTER,
    GET_BLOGS,
    BLOG_ERROR,
    CLEAR_BLOGS
} from './types'

const BlogState = props => {
    const initiateState = {
        blogs: null,
        current: null,
        filtered: null,
        error: null
    };
    const [state, dispatch] = useReducer(BlogReducer, initiateState)

    // Get Blog
    const getBlogs = async () => {
        try{
        const res = await axios.get('/api/blog');
        dispatch({     
            type: GET_BLOGS,
            payload: res.data
         })
        }
        catch(err){
        dispatch({ 
         type: BLOG_ERROR,
         payload: err.response.msg
        })
        }
    }
    // Add Blog
    const addBlog = async blog => {
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      try{
      const res = await axios.post('/api/blog', blog, config)
      dispatch({
          type: ADD_BLOG,
          payload: res.data
      })
      }
      catch(err){
      dispatch({
          type: BLOG_ERROR,
          payload: err.response.data.msg 
      })
      }
    }
    // Delete Blog
    const deleteBlog = async id => {
        try{
            await axios.delete(`api/blog/${id}`)
            dispatch({
                type: DELETE_BLOG,
                payload: id
            })
        }
        catch(err){
        dispatch({
            type: BLOG_ERROR,
            payload: err.response.msg
        })
        }
    }
    // SetCurrent
    const setCurrent = blog => {
        dispatch({
            type: SET_CURRENT,
            payload: blog
        })
    }
    // ClearCurrent
    const clearCurrent = blog => {
        dispatch({
            type: CLEAR_CURRENT,
            payload: blog
        })
    }
    
    // UpdateBlog
   const UpdateBlog = async blog => {
       const config = {
           headers: {
               'Content-Type': 'application/json'
           }
       }
       try{
       const res = await axios.put(`api/blog/${blog._id}`, blog, config)
       dispatch({
           type: UPDATE_BLOG,
           payload: res.data
       })
       }
       catch(err){
       dispatch({
           type: BLOG_ERROR,
           payload: err.response.data.msg
       })
       }
   }
    // Filtered Blog
    const filterBlog = text => {
        dispatch({
            type: FILTER_BLOGS,
            payload: text
        })
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }
    // Clear Blogs
    const clearBlogs = () => {
        dispatch({
            type: CLEAR_BLOGS
        })
    }

    return (
        <blogContext.Provider value={{
            blogs: state.blogs,
            getBlogs,
            addBlog,
            deleteBlog,
            UpdateBlog,
            current: state.current,
            setCurrent,
            clearCurrent,
            filtered: state.filtered,
            filterBlog,
            clearFilter,
            clearBlogs,
            error: state.error
        }}>
            {props.children}
        </blogContext.Provider>
    )
}

export default BlogState
