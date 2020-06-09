import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Users from './components/Users';
import EditUser from './components/EditUser';

function App() {
  const login = localStorage.getItem('auth-login')
  return (
    <div className="App">
       <BrowserRouter>
          <div align="center">      
            <Link to="/SignUp">SignUp</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/SignIn">SignIn</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
            <Route path="/SignUp" component={SignUp}/> 
            <Route path="/SignIn" component={SignIn}/>
            <Route path="/Users" component={Users}/>
            <Route path="/EditUser" component={EditUser}/>
            
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
