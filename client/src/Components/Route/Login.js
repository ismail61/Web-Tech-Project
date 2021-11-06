import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const Login = () => {
    const ErrorToast = (Msg) => {
        toast.error(Msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    //console.log(process.env.REACT_APP_PASSWORD)
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
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
    const history = useHistory()
    const loginSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const response = await axios.post("http://localhost:4444/login", {
                email, password
            })
            if (response.data.err || response.data.message) {
                if (response.data.err) {
                    ErrorToast(response.data.err)
                } else {
                    ErrorToast(response.data.message)
                }
            } else {
                history.push({
                    pathname : `/code/${response.data[0].id}`
                });

            }

        }

    };
    return (
        <div>

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
                                    placeholder="Enter Your Email"
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
                                    name="password"
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
                
            </div>
            
        </div>
    );
};

export default Login;