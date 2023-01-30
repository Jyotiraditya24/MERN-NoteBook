import React from "react";
import { useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { NoteContext } from "../context/notes/noteContext";

const NoteItem = (props) => {
  const note = props.note;
  const { deleteNote } = useContext(NoteContext);
  return (
    <div className=" card my-2">
      <h5 className="card-title mx-auto my-2">{note.title}</h5>
      <div className="card-body">{note.description}</div>
      <div className="mx-2 mb-2">
        <AiFillDelete size={30} className="icon" onClick={()=>{deleteNote(note._id)}}></AiFillDelete>
        <AiFillEdit size={30} className="ms-3 icon"></AiFillEdit>
      </div>
    </div>
  );
};

export default NoteItem;
