import React, { useEffect, useState } from 'react';
import Container from './Container'
import Card from './Card'
import Footter from './Footter';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
const Main = () => {
    const [notes, setNotes] = useState([])
    const [loginStatus, setLoginStatus] = useState("")
    const [show, setShow] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        loadAllNotes();
    }, []);
    useEffect(async () => {
        const login = await axios.get("http://localhost:4444/login")
        if (login.data.isLogged == true) {
            setLoginStatus(login.data.user[0].id)
            console.log(loginStatus)
        }
    }, [loginStatus])
    const loadAllNotes = async () => {
        const notes = await axios.get("http://localhost:4444/notes")
        if (notes.data) {
            setNotes(notes.data)
        }
    }
    const addNote = async (note) => {
        const { content, title } = note;
        console.log("id "+loginStatus)
        const response = await axios.post(`http://localhost:4444/addnote/${loginStatus}`, {
            title, content
        })
        if (response.data.err) {
            console.log(response.data.err)
        } else {
            setNotes([...notes, response.data])
            loadAllNotes()
        }

    }


    const deleteNote = async (id) => {
        const response = await axios.delete(`http://localhost:4444/notes/${id}`)
        if (response.data.err) {
            console.log(response.data.err)
        } else {
            loadAllNotes()
        }
    }
    const editNote = async (props) => {
        setTitle(props.note.title)
        setContent(props.note.content)
        setId(props.note.id)
        handleShow()
    }
    const doneNote = async (id) => {
        const response = await axios.put(`http://localhost:4444/notes/done/${id}`)
        if (response.data.err) {
            console.log(response.data.err)
        } else {
            loadAllNotes()
        }
    }
    const updateNote = async (e) => {
        e.preventDefault();
        handleClose()
        if (title && content) {

            const response = await axios.put(`http://localhost:4444/notes/${id}`, {
                title, content ,loginStatus
            })
            if (response.data.err) {
                console.log(response.data.err)
            } else {
                loadAllNotes()
            }
        }
    }
    const undoNote = async (id) =>{
        const response = await axios.put(`http://localhost:4444/notes/undo/${id}`,{userId : loginStatus})
        if (response.data.err) {
            console.log(response.data.err)
        } else {
            loadAllNotes()
        }
    }

    return (

        <div>
            <Container addNote={addNote} />

            <div className="row">
                {notes.map((note, index) => {
                    if (note.title && note.content) {
                        return (
                            <Card doneNote={doneNote} editNote={editNote} deleteNote={deleteNote}
                             id={note.id} note={note} undoNote={undoNote} />
                        )
                    }

                })}
            </div>
            <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="loginform" onSubmit={updateNote} >
                        <div className="form-group p-2">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />

                        </div>
                        <div className="form-group p-2">
                            <label>Content</label>
                            <input
                                type="text"
                                name="content"
                                className="form-control"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                            />

                        </div>

                        <div className="text-center p-2">
                            <button type="submit" className="btn px-4 btn-primary">
                                <b>Save</b>
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Footter />
        </div>
    );
};

export default Main;