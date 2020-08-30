import React, { useEffect } from 'react';
import authContext from '../Auth/authContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert'
import './Register.scss'

const Register = props => {
    
    const alert = useAlert()

    const AuthContext = useContext(authContext);

    const { register, error, isAuthenticated } = AuthContext;

    // const { register, error, isAuthenticated } = AuthContext;

    useEffect(() => {
       if(isAuthenticated){
           props.history.push('/dashboard')
       } 
       if(error !== null && error === 'user already exists'){
           alert.error('user already exists')
           return false;
       }
    },[error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            alert.error('Please fill in all fields')
        } else if (password !== password2){
            alert.error('Password do not match')
        } 
        else {
            register({
                name,
                email,
                password
            })
        }
    }
    
    return (
        <div className='form-container'>
            <h1>Account 
                <span className='primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text" 
                    name="name" 
                    value={name}
                    onChange={onChange}
                    />
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
                    <label htmlFor="password2">Confirm Password</label>
                    <input 
                    type="password" 
                    name="password2" 
                    value={password2}
                    onChange={onChange}
                    />
                </div>
                <div className='center-btn'>
                <button type="submit" value="Register" className='btn-primary'>
                    Register
                </button>
                </div>
            </form>
        </div>
    )
}

export default Register
