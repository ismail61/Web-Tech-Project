import React from "react";
import { FaTrash, FaEdit } from 'react-icons/fa'
const Card = (props) => {
    const deleteHandlerNote = () => {
        props.deleteNote(props.id)
    }
    const editHandlerNote = () => {
        props.editNote(props);
    }
    //console.log(props)
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 m-5">
            <div className="mt-3 card border-success mb-3">
                <div className="card-header border-success text-center">{props.note.title}</div>
                <div className="card-body text-success">
                    <h5 className="card-title"></h5>
                    <p className="card-text">
                        {props.note.content}
                    </p>
                </div>
                <div className="card-footer bg-transparent border-success d-flex justify-content-between">Created At : {props.note.createdAt}
                    <div className="pull-right">
                        <div className="d-flex">
                            <div title="Edit"  className="px-2">
                                <span onClick={editHandlerNote}>
                                    <div style={{ color: '#eb3462', cursor: 'pointer' }} >
                                        <FaEdit />
                                    </div>
                                </span>
                            </div>
                            <div title="Delete" className="px-2">
                                <span onClick={deleteHandlerNote} className="ml-1">
                                    <div style={{ color: '#eb3462', cursor: 'pointer' }} >
                                        <FaTrash />
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
