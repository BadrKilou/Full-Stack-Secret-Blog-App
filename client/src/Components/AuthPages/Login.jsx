import React, { useContext, useState, useEffect } from 'react';
import authContext from '../Auth/authContext';
import {useAlert} from 'react-alert';

const Login = props => {

    const alert = useAlert()

    const AuthContext = useContext(authContext);
     
    const {login, error, isAuthenticated} = AuthContext;

    useEffect(() => {
     if(isAuthenticated){
         props.history.push('/dashboard')
     }
     if(error !== null && error === 'Invalid Credentials'){
        alert.info('Invalid Credentials')
    }
    else if (error !== null && error === 'Invalid Data'){
        alert.show("User doesn't exist make sure to register before login")
    }
    }, [isAuthenticated, error, props.history])
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {email, password} = user;
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){
         alert.error('Please fill in all fields')
        }
        
        else{
            login({
                email,
                password
            })
        }
    }

    return (
        <div className='form-container'>
            <h1>Account 
                <span className='primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={onChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={onChange}
                    />
                </div>
                <div className='center-btn'>
                <button type="submit" className='btn-primary'>
                    Login
                </button>
                </div>
            </form>
        </div>
    )
}

export default Login
