import {
    ADD_BLOG,
    DELETE_BLOG,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BLOG,
    FILTER_BLOGS,
    CLEAR_FILTER,
    BLOG_ERROR,
    GET_BLOGS,
    CLEAR_BLOGS
} from './types';



export default (state, action) => {
    switch(action.type){
        case GET_BLOGS:
            return{
                ...state,
                blogs: action.payload,
                loading: false
            }
        case ADD_BLOG:
            return{
                ...state,
                blogs: [...state.blogs, action.payload],
                loading: false
            }
        case DELETE_BLOG:
            return{
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
                loading: false
            }
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload,
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null,
            }
        case UPDATE_BLOG:
            return{
                ...state,
                blogs: state.blogs.map(blog => blog._id === action.payload._id ? action.payload : blog),
                loading: false
            }
        case FILTER_BLOGS:
            return{
                ...state,
                filtered: state.blogs.filter(blog => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return blog.title.match(regex) || blog.author.match(regex)
                })
            }
        case BLOG_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }  
        case CLEAR_BLOGS:
            return{
                ...state,
                blogs: null,
                filtered: null,
                error: null
            }
            default:
            return state
    }
}