import React, { useEffect, useState } from 'react';
import Container from './Container'
import Card from './Card'
import Footer from './Footer';
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { Button, Offcanvas } from 'react-bootstrap'
import { styled } from '@mui/system';
import { pink, red } from '@mui/material/colors';
import BadgeUnstyled from '@mui/core/BadgeUnstyled';
import DeleteIcon from '@mui/icons-material/Delete';
import TrashCard from './TrashCard.js'
import { Redirect } from 'react-router-dom'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { toast } from 'react-toastify';
import './Main.css'
const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-dot {
    padding: 0;
    z-index: auto;
    min-width: 6px;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-anchorOriginTopRightCircular {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;
const Main = (props) => {
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
    const [timePicker, setTimePicker] = useState(new Date())
    const [time, setTime] = useState('')
    const [timerProps, setTimerProps] = useState([])
    const [notes, setNotes] = useState([])
    const [notePin, setPinNote] = useState([])
    const [deleteNotes, setDeleteNotes] = useState([])
    const [show, setShow] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => { setShow2(false); }
    const handleShow2 = () => setShow2(true);

    const loadAllNotes = async () => {
        if (props.user) {
            const notes = await axios.get(`http://localhost:4444/notes/${props.user.id}`)
            
            //console.log(notes)
            if (notes.data) {
                setNotes(notes.data)
            }
        }
    }
    const loadPinNote = async () => {
        if (props.user) {
            const pinNotes = await axios.get(`http://localhost:4444/pinnote/${props.user.id}`)
            
            if (pinNotes.data) {
                setPinNote(pinNotes.data)
            }
        }
    }
    const loadAllDeleteNotes = async () => {
        if (props.user) {
            const notes = await axios.get(`http://localhost:4444/deletenotes/${props.user.id}`)
            //console.log(notes)
            if (notes.data) {
                setDeleteNotes(notes.data)
            }
        }
    }
    useEffect(() => {
        loadAllNotes();
        loadAllDeleteNotes()
        loadPinNote()
    }, []);


    const addNote = async (note) => {
        const { title, content } = note;
        const response = await axios.post(`http://localhost:4444/addnote/${props.user.id}`, {
            title, content
        })
        if (response.data.err) {
            ErrorToast(response.data.err)
        } else {
            setNotes([...notes, response.data])
            loadAllNotes()
            loadPinNote()
        }

    }
    const deleteNote = async (id) => {
        const response = await axios.delete(`http://localhost:4444/notes/${id}`, {
            data: { userId: props.user.id }
        })
        if (response.data.err) {
            ErrorToast(response.data.err)
        } else {
            loadPinNote()
            loadAllNotes()
            loadAllDeleteNotes()
            
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
            ErrorToast(response.data.err)
        } else {
            loadAllNotes()
        }
    }
    const updateNote = async (e) => {
        e.preventDefault();
        handleClose()
        if (title && content) {

            const response = await axios.put(`http://localhost:4444/notes/${id}`, {
                title, content, userId: props.user.id
            })
            if (response.data.err) {
                ErrorToast(response.data.err)
            } else {
                loadAllNotes()
            }
        }
    }
    const undoNote = async (id) => {

        const response = await axios.put(`http://localhost:4444/notes/undo/${id}`, { userId: props.user.id })
        if (response.data.err) {
            ErrorToast(response.data.err)
        } else {
            loadAllNotes()
        }
    }
    ///Trash

    const deleteNote1 = async (id) => {
        const note1 = await axios.get(`http://localhost:4444/deletenote/${id}`)
        if (!note1.data.err) {
            const response = await axios.delete(`http://localhost:4444/deletenote/${id}`, {
                data: {
                    userId: props.user.id
                }
            })
            if (response.data.err) {
                ErrorToast(response.data.err)
            } else {
                await axios.delete(`http://localhost:4444/deletenote/oldnote/${note1.data[0].noteId}`)
                loadAllNotes();
                loadAllDeleteNotes();
                loadPinNote()
            }
        }
    }
    const recoverNote1 = async (id) => {
        const response = await axios.delete(`http://localhost:4444/deletenote/recover/${id}`, {
            data: {
                userId: props.user.id
            }
        })
        if (response.data.err) {
            ErrorToast(response.data.err)
        } else {
            loadAllDeleteNotes()
            loadAllNotes();
            loadPinNote();
        }
    }
    const remainderNote = async (props) => {

        if (props.note.is_done) {
            ErrorToast('Sorry! This note has already become done')
        }
        else {
            setTimerProps(props)
            handleShow2()
            setTimePicker(new Date())
            setTime(new Date())
        }
    }
    const timeDatePickerNote = async (e) => {
        if (timerProps.note) {
            e.preventDefault()
            if (time.getTime() - new Date().getTime() > 0) {
                //console.log(timerProps.note.is_done)
                handleClose2()
                setTimeout(async () => {
                    if (timerProps.note) {
                        let response = await axios.post(`http://localhost:4444/notify`, timerProps.note)
                        if (response.data.err) {
                            ErrorToast(response.data.err)
                        } else {
                            ErrorToast(timerProps.note.title + ' Notification!\n Please check your email for more information about this remainder note')
                        }
                    }
                }, time.getTime() - new Date().getTime());
            } else {
                ErrorToast('Incorrect Time/Date Pick')
            }
        } else {
            ErrorToast('Sorry! This note has already become done')
        }

    }
    const pinNote = async (id)=> {
        const response = await axios.post(`http://localhost:4444/pinnote/${id}`, {
                userId: props.user.id
        })
        if (response.data.err) {
            ErrorToast(response.data.err)
        } else {
            loadPinNote()
            loadAllNotes()
            loadAllDeleteNotes()
        }
    }
    if (!props.user) {
        return <Redirect to='/login' />
    } else {

        //console.log(props.search)
        const filteredNotes = notes.filter(note => {
            return note.title?.toLowerCase().indexOf(props.search?.toLowerCase()) !== -1;
        });
        return (

            <div className={props.mode ? 'dark' : 'light'}>
                <Container addNote={addNote} />
                <div className="col-md-4">
                    {/* <DateTimePickerComponent /> */}
                </div>
                {props.user ?
                    <div className="container-fluid mx-5 mt-4 ">
                        <Button variant="warning" onClick={handleShow1} className="icon-btn">
                            Trash
                            <StyledBadge badgeContent={Object.keys(deleteNotes).length} overlap="circular">
                                <DeleteIcon sx={{ color: red[700] }} />
                            </StyledBadge>
                        </Button>

                        <Offcanvas show={show1} onHide={handleClose1}>
                            <Offcanvas.Header closeButton className="text-center">
                                <Offcanvas.Title> All Deleted Note </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {deleteNotes.map((note, index) => {
                                    if (note.title && note.content) {
                                        return (
                                            <TrashCard key={index} recoverNote1={recoverNote1} deleteNote1={deleteNote1} id={note.id} note={note} />
                                        )
                                    }

                                })}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div> : null}
                    {(notePin.length>0)?<hr/>:''}
                {(notePin.length>0)?<center className="text-primary font-weight-bold">Pin Note</center>:''}
                <div>
                    <div className="row">
                        {notePin.map((note, index) => {
                            if (note.title && note.content) {
                                return (
                                    <Card pinNote={pinNote} remainderNote={remainderNote} doneNote={doneNote} editNote={editNote} deleteNote={deleteNote}
                                        key={index} id={note.id} note={note} undoNote={undoNote} />
                                )
                            }

                        })}
                    </div>
                </div>
                {(filteredNotes.length>0)?<hr/>:''}
                {(filteredNotes.length>0)?<center className="text-primary font-weight-bold">All Notes</center>:''}
                <div>
                    <div className="row">
                        {filteredNotes.map((note, index) => {
                            if(notePin[0]){
                                if (note.title && note.content && notePin[0].id!=note.id) {
                                    return (
                                        <Card pinNote={pinNote} remainderNote={remainderNote} doneNote={doneNote} editNote={editNote} deleteNote={deleteNote}
                                            key={index} id={note.id} note={note} undoNote={undoNote} />
                                    )
                                }
                            }else{
                                if (note.title && note.content) {
                                    return (
                                        <Card pinNote={pinNote} remainderNote={remainderNote} doneNote={doneNote} editNote={editNote} deleteNote={deleteNote}
                                            key={index} id={note.id} note={note} undoNote={undoNote} />
                                    )
                                }
                            }
                            

                        })}
                    </div>
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
                                <textarea
                                    style={{ border: '1px solid #C2DBFE', outlineStyle: '1px solid', outlineColor: '#C2DBFE' }}
                                    type="text"
                                    name="content"
                                    className="form-control mb-2 p-2 d-flex"
                                    cols='44'
                                    rows='45'
                                    onChange={(event) => setContent(event.target.value)}
                                >{content}</textarea>

                            </div>

                            <div className="text-center p-2">
                                <button type="submit" className="btn px-4 btn-primary">
                                    <b>Save</b>
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={show2} onHide={handleClose2} animation={true} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>Remind Me</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="timeform" onSubmit={timeDatePickerNote}>
                            <div className="form-group p-2">
                                <label>Set Time & Date</label>
                                <DateTimePickerComponent
                                    format="dd-MMM-yy HH:mm"
                                    name="timePicker"
                                    value={timePicker}
                                    onChange={(event) => setTime(event.target.value)
                                    }
                                    min={timePicker}
                                    placeholder="Please choose a time and date"
                                />

                            </div>

                            <div className="text-center p-2">
                                <button type="submit" className="btn px-4 btn-primary">
                                    <b>Time Set</b>
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Footer />
            </div>
        );
    }
};

export default Main;