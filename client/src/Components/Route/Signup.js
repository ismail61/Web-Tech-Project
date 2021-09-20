import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from './Nav'
import axios from 'axios'
const Signup = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [nameError, setnameError] = useState("");
    const history = useHistory();
    
    const handleValidation = (event) => {
        let formIsValid = true;

        if (!name.match(/^[a-zA-Z ]{6,100}$/)) {
            formIsValid = false;
            setnameError(
                "Only Letters and length must be min 6 Chracters"
            );
            return false;
        } else {
            setnameError("");
            formIsValid = true;
        }

        if (!email.match(/\S+@\S+\.\S+/)) {
            formIsValid = false;
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            formIsValid = true;
        }

        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
            formIsValid = false;
            setpasswordError(
                "Password must be min 6 Characters and one letter and one number"
            );
            return false;
        } else {
            setpasswordError("");
            formIsValid = true;
        }
        

        return formIsValid;
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const valid = handleValidation();
        if(valid){
            const response = await axios.post("http://localhost:4444/signup",{
                email,password
            })
            
            if(response.data[0]){
                history.push("/login");
            }
        }
    };
    return (
        <div>
            <Nav />
            <div className="container p-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form  onSubmit={loginSubmit}>
                        <div className="form-group p-2">
                                <label>Name </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="EmailInput"
                                    name="name"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter your Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {nameError}
                                </small>
                            </div>
                            <div className="form-group p-2">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {emailError}
                                </small>
                            </div>
                            <div className="form-group p-2">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name ="password"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;