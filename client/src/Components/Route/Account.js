import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import "./Account.css";
const Account = (props) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState(0);
    const [user, setUser] = useState([]);
    const [updateUser, setUpdateUser] = useState([]);
    const history = useHistory()
    useEffect(async () => {
        if (props.email) {
            const response = await axios.get(
                `http://localhost:4444/account/${props.email}`
            );
            setUser(response.data[0]);
            const response2 = await axios.get(
                `http://localhost:4444/account/info/${user.id}`
            );
            setUpdateUser(response2.data[0]);
            //console.log(response2.data[0])
        }
    }, []);
    const updateInfo = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:4444/accountUpdate/${user.id}`, {
            name,address,state,zip
        })
        if (!response.data.err) {
            history.push("/");
        }
    }
    return (
        <div>
            <Nav email={props.email} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                        <h2 className="h3 my-4 page-title">{user.email}</h2>
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
                                            <h4 className="mb-1">{user.name}</h4>
                                            <p className="small mb-3">
                                                <span className="badge badge-dark">Bangladesh</span>
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
                                        placeholder={updateUser?updateUser.name:"Name"}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        disabled
                                        value={user.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="inputAddress5">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={updateUser?updateUser.address:"Dhaka"}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputState5">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => setState(event.target.value)}
                                            placeholder={updateUser?updateUser.state:"Sylhet"}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label for="inputZip5">Zip</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={(event) => setZip(event.target.value)}
                                            placeholder={updateUser?updateUser.zip:"1234"}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">
                                    Save Change
                                </button>
                            </form>
                            <hr className="my-4" />
                            <form>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="inputPassword4">Old Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="inputPassword5"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="inputPassword5">New Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="inputPassword5"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="inputPassword6">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="inputPassword6"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="mb-2">Password requirements</p>
                                        <p className="small text-muted mb-2">
                                            To create a new password, you have to meet all of the
                                            following requirements:
                                        </p>
                                        <ul className="small text-muted pl-4 mb-0">
                                            <li>Minimum 8 character</li>
                                            <li>At least one special character</li>
                                            <li>At least one number</li>
                                            <li>Can’t be the same as a previous password</li>
                                        </ul>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save Change
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
