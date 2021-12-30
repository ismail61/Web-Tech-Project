import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import {toast} from 'react-toastify'
const Code = () => {
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
    const { id } = useParams();
    const [otp, setOtp] = useState("")
    const otpSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:4444/code", { id, otp })
        if (response.data.err || response.data.message) {
            if (response.data.err) {
                ErrorToast(response.data.err)
            } else {
                ErrorToast(response.data.message)
            }
        } else {
            localStorage.setItem('user', JSON.stringify(response.data))
            window.location.href = "/"
        }
        
    }
    return (
        <div>

            <div className="container p-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form id="otpform" onSubmit={otpSubmit}>
                            <div className="form-group p-2">
                                <label>Email address</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="otp"
                                    aria-describedby="emailHelp"
                                    placeholder="OTP Enter"
                                    onChange={(event) => setOtp(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    { }
                                </small>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Code;