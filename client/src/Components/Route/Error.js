import React from 'react';
import {useLocation,NavLink,useHistory} from 'react-router-dom'
const Error = () => {
    const {pathname} = useLocation()
    const history = useHistory()
    console.log(history)
    /* const goHome=()=>{
        return(
            <a href="/"></a>
        )
    } */
    return (
        <div>
            <h1>Oops! Page not found!</h1>      
            {pathname?<NavLink to="/"><button>Go Home</button></NavLink>:null}
            <button onClick={()=>history.goBack()}>Back Refresh</button>
            <button onClick={()=>history.goForward()}>Forward Refresh</button>
            <button onClick={()=>history.push('/')}>Home</button>
            <button onClick={()=>history.replace('/login')}>Replace</button>
        </div>
    );
};

export default Error;