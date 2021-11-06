import React from "react";
import { FaTrash, FaEdit } from 'react-icons/fa'
import {MdDone} from 'react-icons/md'
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import {BiUndo,BiBellPlus} from 'react-icons/bi'
const Card = (props) => {
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
        
    }
    const undoHandlerNote = () =>{
        props.undoNote(props.id);
    }
    const remainderHandlerNote = ()=>{
        props.remainderNote(props.id)
    }
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 m-5">
            <div className="mt-3 card border-success mb-3">
                <div className={"card-header text-dark border-success text-center " + (props.note.is_done ? 'text-decoration-line-through' : '')}>{props.note.title}</div>
                <div className="card-body text-success">
                    <h5 className="card-title"></h5>
                    <p className={"card-text " + (props.note.is_done ? 'text-decoration-line-through' : '')}>
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
                                <span onClick={doneHandlerNote}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
