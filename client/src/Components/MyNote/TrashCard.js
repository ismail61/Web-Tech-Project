import React from "react";
import { FaTrash } from 'react-icons/fa'
import {RiDeviceRecoverLine} from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TrashCard = (props) => {

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
    const deleteHandler = () => {
        props.deleteNote1(props.id)
    }
    const recoverHandler = ()=>{
        props.recoverNote1(props.id)
    }
    return (
        <>
            <div className="mt-3 card border-success mb-3">
                <div className={"card-header border-success text-center " + (props.note.is_done ? 'text-decoration-line-through' : '')}>{props.note.title}</div>
                <div className="card-body text-success">
                <h5 className="card-title"></h5>
                    <p className={"card-text " + (props.note.is_done ? 'text-decoration-line-through' : '')}>
                        {props.note.content}
                    </p>
                </div>
                <div className={"card-footer bg-transparent border-success d-flex justify-content-between " + (props.note.is_done ? 'text-decoration-line-through' : '')}>
                    Updated At : {props.note.updatedAt}
                    <div className="pull-right">
                        <div className="d-flex">
                            <div title="Permanent Delete" className="px-2">
                                <span onClick={deleteHandler} className="ml-1">
                                    <div style={{ color: '#eb3462', cursor: 'pointer', fontSize: '20px' }} >
                                        <FaTrash />
                                    </div>
                                </span>
                            </div>
                            <div title="Recover" className="px-2" style={{fontSize:'17px'}}>
                                <span onClick={recoverHandler}>
                                    <div style={{ color: '#42ba96', cursor: 'pointer', fontSize: '20px' }} >
                                        <RiDeviceRecoverLine />
                                    </div>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </>
    );
};

export default TrashCard;
