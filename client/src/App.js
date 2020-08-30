import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Components/layout/Navbar';
import Dashboard from './Components/layout/pages/Dashboard';
import About from './Components/layout/pages/About';
import BlogState from './Context/BlogState';
import AuthState from './Components/Auth/authState';
import Register from './Components/AuthPages/Register';
import Login from './Components/AuthPages/Login';
import Home from './Components/layout/pages/Home';
import PrivateRoute from './Components/AuthPages/PrivateRoute/PrivateRoute';
import setAuthToken from './Components/token/setAuthToken';
import './App.css';

// Load User
if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App(){
  return (
    <AuthState>
      <BlogState>
      <Router>
        <Fragment> 
          <Navbar />
          <div className='container'>
           <Switch>
             <PrivateRoute exact path='/dashboard' component={Dashboard} />
             <Route exact path='/' component={Home} />
             <Route exact path='/about' component={About} />
             <Route exact path='/register' component={Register} />
             <Route exact path='/login' component={Login} />
           </Switch>
          </div>
        </Fragment>
      </Router>
      </BlogState> 
      </AuthState>
  )
}

export default App



