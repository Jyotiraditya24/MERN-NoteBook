import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { NoteContext } from "../context/notes/noteContext";


const AddNotes = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const[note,setNote]= useState({title:"",description:"",tag:"default"});
  
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <div className="container">
      <h1>ADD A NOTE</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="description"
            name="description"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          ADD A NOTE
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
