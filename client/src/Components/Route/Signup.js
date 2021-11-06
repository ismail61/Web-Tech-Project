import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-toastify'
const Signup = () => {
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
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    const history = useHistory();

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
        const valid = handleValidation();
        if (valid) {
            const response = await axios.post("http://localhost:4444/signup", {
                email, password
            })
            if (!response.data.err) {
                history.push("/login");
            }else{
                ErrorToast(response.data.err)
            }
        }
    };
    return (
        <div>
            
            <div className="container p-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={loginSubmit}>

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
                                    className="form-control"
                                    name="password"
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