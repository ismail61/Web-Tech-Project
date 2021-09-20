import React, { useState } from "react";

const Container = (props) => {
  const [expand, setExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;

    setNote((oldNote) => {
      return {
        ...oldNote,
        [name]: value
      };
    });
  };
  const addNoteEvent = () => {
    const {content,title} = note;
    if(content && title){
      props.addNote(note);
      setNote({
        title: "",
        content: ""
      });
      setExpand(false);
    }
  };
  const expandChange = () => {
    setExpand(true);
  };
  const btNormal = () => {
    setExpand(false);
  };

  return (
    <div className="container card card-body" onDoubleClick={btNormal}>
      <div
        style={{ margin: "50px", width: "400px" }}
        className="text-center m-auto my-5 rounded-pill text-center">
        {expand ? (
          <input
            value={note.title}
            onChange={inputHandler}
            name="title"
            style={{ fontSize: "20px", outline: "none" }}
            placeholder="Title Here"
            className="form-control mb-2"
            type="text"
          />
        ) : null}
        <textarea
          value={note.content}
          onClick={expandChange}
          onChange={inputHandler}
          name="content"
          placeholder="Enter Some Note"
          className=" mb-2 form-control"
        ></textarea>
        {expand ? (
          <button onClick={addNoteEvent} variant="outlined" className="btn btn-outline-success rounded">
            Add A Note
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Container;
