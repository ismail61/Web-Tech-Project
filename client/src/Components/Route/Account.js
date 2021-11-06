import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'
import "./Account.css";
const Account = (props) => {
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
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState(0);
    const [updateUser, setUpdateUser] = useState([]);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [min6, setMin6] = useState(false)
    const [character1, setCharacter1] = useState(false)
    const [digit1, setDigit1] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState(false)
    const history = useHistory()
    const loadUser = async () => {
        if (props.user) {
            const response = await axios.get(
                `http://localhost:4444/account/info/${props.user.id}`
            );
            setUpdateUser(response.data[0]);
        }
    }
    useEffect(() => {
        loadUser()
    }, []);
    const updateInfo = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:4444/accountUpdate/${props.user.id}`, {
            name: name ? name : updateUser.name
            , address: address ? address : updateUser.address
            , state: state ? state : updateUser.state
            , zip: zip ? zip : updateUser.zip
        })
        if (!response.data.err) {
            loadUser()
        }
    }
    const updatePassword = async (e) => {
        e.preventDefault()
        if (oldPass != props.user.password) {
            ErrorToast("Old Password Doesn't Match")
        } else if (newPass != confirmPass) {
            ErrorToast("The new password and confirmation password do not match.")
        } else {
            const response = await axios.put(`http://localhost:4444/users/password/${props.user.id}`, {
               newPass
            })
            if (!response.data.err) {
                localStorage.clear()
                window.location.href = "/login"
            }
        }
    }
    const newPasswordHandler = (e) => {
        const character = /[a-zA-Z]/;
        const number = /\d/;
        (e.target.value.length > 5) ? setMin6(true) : setMin6(false);
        (character.test(e.target.value)) ? setCharacter1(true) : setCharacter1(false);
        (number.test(e.target.value)) ? setDigit1(true) : setDigit1(false);
        (oldPass != e.target.value) ? setPasswordCheck(true) : setPasswordCheck(false);
        setNewPass(e.target.value);

    }
    const confirmPasswordHandler = (e) => {
        setConfirmPass(e.target.value)
    }
    if (!props.user) {
        return <Redirect to='/login' />
    } else {
        return (
            <div className={props.mode ? 'dark1' : 'light1'}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                            <h2 className="h3 my-4 page-title">{props.user.email}</h2>
                            <div className="my-4">
                                <ul className="nav nav-tabs mb-4">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="false"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                </ul>

                                <div className="row mt-5 align-items-center">
                                    <div className="col-md-3 text-center mb-5">
                                        <div className="avatar avatar-xl">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row align-items-center">
                                            <div className="col-md-7">
                                                <h4 className="mb-1">{updateUser.name}</h4>
                                                <p className="small mb-3">
                                                    <span className="badge1">Bangladesh</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-7">
                                                <p className="text-muted">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                    elit. Mauris blandit nisl ullamcorper, rutrum metus
                                                    in, congue lectus. In hac habitasse platea dictumst.
                                                    Cras urna quam, malesuada vitae risus at, pretium
                                                    blandit sapien.
                                                </p>
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <form onSubmit={updateInfo}>
                                    <div className="form-group">
                                        <label for="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder={updateUser ? updateUser.name : "Name"}
                                            onChange={(event) => setName(event.target.value)}
                                            defaultValue={updateUser.name}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            disabled
                                            value={props.user.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputAddress5">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={updateUser ? updateUser.address : "Dhaka"}
                                            onChange={(event) => setAddress(event.target.value)}
                                            defaultValue={updateUser.address}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputState5">State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(event) => setState(event.target.value)}
                                                placeholder={updateUser ? updateUser.state : "Sylhet"}
                                                defaultValue={updateUser.state}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputZip5">Zip</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                onChange={(event) => setZip(event.target.value)}
                                                placeholder={updateUser ? updateUser.zip : "1234"}
                                                defaultValue={updateUser.zip}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">
                                        Save Change
                                    </button>
                                </form>
                                <hr className="my-4" />
                                <form onSubmit={updatePassword}>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="inputPassword4">Old Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="inputPassword5"
                                                    onChange={(event) => setOldPass(event.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="inputPassword5">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="inputPassword5"
                                                    onChange={newPasswordHandler}
                                                    name="newPass"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="inputPassword6">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="inputPassword6"
                                                    onChange={confirmPasswordHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-2">Password requirements</p>
                                            <p className="small text-muted mb-2">
                                                To create a new password, you have to meet all of the
                                                following requirements:
                                            </p>
                                            <ul className="small pl-4 mb-0">
                                                <li className={min6 ? 'text-primary' : ''}>Minimum 6 character</li>
                                                <li className={character1 ? 'text-primary' : ''}>At least one character</li>
                                                <li className={digit1 ? 'text-primary' : ''}>At least one number</li>
                                                <li className={passwordCheck ? 'text-primary' : ''}>Can’t be the same as a previous password</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {min6 && character1 && digit1 && passwordCheck ?
                                        <button type="submit" className="btn btn-primary">
                                            Save Change
                                        </button> :
                                        <button disabled className="">
                                            Save Change
                                        </button>
                                    }
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Account;
