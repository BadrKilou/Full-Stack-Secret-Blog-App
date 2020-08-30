import React, { useReducer } from 'react'
import authContext from './authContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../token/setAuthToken';
import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../../Context/types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        loading: true,
        isAuthenticated: null,
        error: null,
        user: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // Load User
    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try{
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }

        catch(err){
          dispatch({
              type: AUTH_ERROR
          })
        }
    }

    // Register
    const register = async FormData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
        const res = await axios.post('/api/users', FormData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        loadUser();
        }
        catch(err){
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
            
        })
        }
    }

    // Login
    const login = async FormData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
        const res = await axios.post('/api/auth', FormData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        loadUser()
        }
        catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    const logout = () => {
     dispatch({
         type: LOGOUT
     })
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    
    
    return (
        <authContext.Provider value={{
         token: state.token,
         isAuthenticated: state.isAuthenticated,
         loading: state.loading,
         error: state.error,
         user: state.user,
         register,
         loadUser,
         login,
         logout,
         clearErrors
        }}>
           {props.children}            
        </authContext.Provider>
    )
}

export default AuthState;
