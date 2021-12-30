import React from "react";
import { FaTrash, FaEdit } from 'react-icons/fa'
import {MdDone} from 'react-icons/md'
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import {BiUndo,BiBellPlus} from 'react-icons/bi'
import {AiFillPushpin} from 'react-icons/ai'
import { toast } from 'react-toastify';
const Card = (props) => {
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
    const deleteHandlerNote = () => {
        props.deleteNote(props.id)
    }
    const editHandlerNote = () => {
        props.editNote(props);
    }
    const doneHandlerNote = () =>{
        props.doneNote(props.id);
    }
    const editNotAlert =()=>{
        ErrorToast('This note can not be changed now. Because it has become done')
    }
    const notDoneHandlerNote = () =>{
        ErrorToast('This note has already become done')
    }
    const undoHandlerNote = () =>{
        props.undoNote(props.id);
    }
    const pinHandlerNote = () => {
        props.pinNote(props.id)
    }
    const remainderHandlerNote = ()=>{
        props.remainderNote(props)
    }
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 m-5">
            <div className="mt-3 card border-success mb-3">
                <div className={"card-header text-dark border-success text-center " + (props.note.is_done ? 'text-decoration-line-through' : '')}>{props.note.title}</div>
                <div className="card-body text-success">
                    <h5 className="card-title"></h5>
                    <p style={{whiteSpace : 'pre-line'}} className={"card-text " + (props.note.is_done ? 'text-decoration-line-through' : '')}>
                        {props.note.content}
                    </p>
                </div>
                <div className={"card-footer bg-transparent border-success d-flex justify-content-between "+ (props.note.is_done ? 'text-decoration-line-through' : '')}>
                    Edited At : {props.note.updatedAt}
                    <div className="pull-right">
                        <div className="d-flex">
                            <div title="Edit"  className="px-1">
                                <span onClick={props.note.is_done?editNotAlert:editHandlerNote}>
                                    <div style={{ color: '#42ba96', cursor: 'pointer',fontSize : '20px' }} >
                                        <FaEdit />
                                    </div>
                                </span>
                            </div>
                            <div title="Delete" className="px-1">
                                <span onClick={deleteHandlerNote} className="ml-1">
                                    <div style={{ color: '#eb3462', cursor: 'pointer',fontSize : '19px' }} >
                                        <FaTrash />
                                    </div>
                                </span>
                            </div>
                            <div title="Remainder" className="px-1">
                                <span onClick={remainderHandlerNote} className="ml-1">
                                    <div style={{ color: '#eb3462', cursor: 'pointer',fontSize : '20px' }} >
                                        <BiBellPlus />
                                    </div>
                                </span>
                            </div>
                            <div title={props.note.is_done ? 'Done' : 'Mark as Done'}  className="px-1">
                                <span onClick={props.note.is_done?notDoneHandlerNote:doneHandlerNote}>
                                    <div style={{ color: '#42ba96', cursor: 'pointer' ,fontSize : '20px' }} >
                                        {props.note.is_done? <IoCheckmarkDoneCircleSharp/> : <MdDone /> }  
                                    </div>
                                </span>
                            </div>
                            <div title="Undo" className="px-1">
                                <span onClick={undoHandlerNote}>
                                    <div style={{ color: '#42ba96', cursor: 'pointer' ,fontSize : '22px' }} >
                                        <BiUndo/> 
                                    </div>
                                </span>
                            </div>
                           {/*  <div title="Pin Note" className="px-1">
                                <span onClick={pinHandlerNote}>
                                    <div style={{ color: '#42ba96', cursor: 'pointer' ,fontSize : '22px' }} >
                                        <AiFillPushpin/> 
                                    </div>
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
