import React,{useEffect,useState} from 'react';
import Login from './Login'
import Notes from './Notes'
import SignUp from './Signup';
import Account from './Account'
import {Route,Switch,useLocation} from 'react-router-dom'

const Home = (props) => { 
    
    return (
        <div>
            <Switch>
                <Route path='/' exact component={()=>
                    <Notes email={props.email} />
                } />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' component={SignUp} />
                <Route path='/account' component={()=><Account email={props.email}/>} />
            </Switch>
            
        </div>
    );
};

export default Home;