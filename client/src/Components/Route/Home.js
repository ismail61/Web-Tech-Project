import React,{useEffect,useState} from 'react';
import Login from './Login'
import Notes from './Notes'
import SignUp from './Signup';
import {Route,Switch,useLocation} from 'react-router-dom'

const Home = (props) => { 
    const location = useLocation();
    const [email, setEmail] = useState("")
    useEffect(() => {
       setEmail(location.state)
    }, [location]);
    
    return (
        <div>
            <Switch>
                <Route path='/' exact component={()=>
                <Notes email={email} />
                } />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' component={SignUp} />
            </Switch>
            
        </div>
    );
};

export default Home;