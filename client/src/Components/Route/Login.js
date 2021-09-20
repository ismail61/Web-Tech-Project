import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from './Nav'
import axios from 'axios'
const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const history = useHistory();
    const [err,setError] = useState("")
    const [user,setUser] = useState("")
    const handleValidation = (event) => {
        let formIsValid = true;

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
        if(handleValidation()){
            const response = await axios.post("http://localhost:4444/login",{
                email,password
            })
            if(response.data.err || response.data.message){
                if(response.data.err){
                    setError(response.data.err)
                }else{
                    setError(response.data.message)
                }
            }else{
                //console.log(response.data)
                history.push({
                    pathname : "/",
                });
            }
            
        }
        
    };
    return (
        <div>
            <Nav />
            <div className="container p-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form id="loginform" onSubmit={loginSubmit}>
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
                                    name ="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <small className="text-danger form-text">
                    {err}
                </small>
            </div>
        </div>
    );
};

export default Login;