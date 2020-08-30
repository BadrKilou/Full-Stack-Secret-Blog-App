import React, { useContext, useRef, useEffect } from 'react';
import blogContext from '../../../Context/blogContext';
import './BlogFilter.scss'

const BlogFilter = () => {
    const BlogContext = useContext(blogContext)
    const text = useRef('')

     const { filterBlog, clearFilter, filtered } = BlogContext;

     useEffect(() => {
         if(filtered === null){
             text.current.value = '';
         }
     })
     const onChange = e => {
         if(text.current.value !== ''){
            filterBlog(e.target.value)
         } else{
             clearFilter()
         }
     }

    return (
        <form className='filter-Form'>
        <input 
        ref={text} 
        type="text"
        placeholder="Filtered Blogs..."
        onChange={onChange}
        className='filter-input'
         />
       </form>
    )
}

export default BlogFilter
