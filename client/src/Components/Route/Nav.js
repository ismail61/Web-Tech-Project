import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { CgSun } from 'react-icons/cg'
import { HiMoon } from 'react-icons/hi'
const Nav = (props) => {
    const onChange = (e) => {
        props.searchNote(e.target.value)
    }
    const darkMode = () =>{
        props.darkMode()
    }
    const lightMode = () =>{
        props.lightMode()
    }
    if (props.user) {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-md">
                        <NavLink className="navbar-brand" to="/">My Note</NavLink>
                        <div className="d-flex">
                            <NavLink exact activeStyle={{ color: 'pink' }} className="p-2" to="/">Home</NavLink>
                            <NavLink activeClassName="active" className="p-2" to="/logout">Logout</NavLink>
                            <NavLink activeClassName="active" className="p-2" to="/account">{props.user.email}</NavLink>
                            <div className="d-flex">
                                <input onChange={onChange} className="form-control ml-2 my-1" placeholder="Search Here" />
                            </div>
                            <div style={{ fontSize: '25px', cursor: 'pointer' }} className="px-2 pt-1 text-white display-1">
                                {props.mode ?
                                    <div onClick={lightMode} title="Light Mode"><CgSun /></div>
                                    :
                                    <div onClick={darkMode} title="Dark Mode"><HiMoon /></div>
                                }
                            </div>
                        </div>
                    </div>
                </nav >
            </div >
        )
    } else {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-md">
                        <NavLink className="navbar-brand" to="/">My Note</NavLink>
                        <div className="d-flex">
                            <NavLink exact activeStyle={{ color: 'pink' }} className="p-2" to="/">Home</NavLink>
                            <NavLink activeClassName="active" className="p-2" to="/login">Login</NavLink>
                            <NavLink activeClassName="active" className="p-2" to="/signup">Sign Up</NavLink>
                            <div style={{ fontSize: '25px', cursor: 'pointer' }} className="px-2 pt-1 text-white display-1">
                                {props.mode ?
                                    <div onClick={lightMode} title="Light Mode"><CgSun /></div>
                                    :
                                    <div onClick={darkMode} title="Dark Mode"><HiMoon /></div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
};

export default Nav;