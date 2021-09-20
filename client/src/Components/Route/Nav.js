import React from 'react';
import {NavLink} from 'react-router-dom'

import './Nav.css'
const Nav = (props) => {
    console.log(props)
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-md">
                    <NavLink className="navbar-brand" to="/">My Note</NavLink>
                    <div className="d-flex">
                        <NavLink exact activeStyle={{color:'pink'}} className="p-2" to="/">Home</NavLink>
                        { props ? <NavLink activeClassName="active" className="p-2" to="/login">Logout</NavLink> : <NavLink activeClassName="active" className="p-2" to="/login">Login</NavLink>}
                        {props ? <NavLink activeClassName="active" className="p-2" to="/signup">{props.email}</NavLink> :<NavLink activeClassName="active" className="p-2" to="/signup">Sign Up</NavLink> }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;