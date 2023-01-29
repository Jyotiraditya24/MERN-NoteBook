import React from "react";
import { useContext } from "react";
import { NoteContext } from "../context/notes/noteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(NoteContext);
  const {notes, addNote} = context;
  return (
    <div className="container my-5">
        <AddNotes></AddNotes>
      <h1 style={{ textAlign: "center" }}>Note Section</h1>
      {notes.map((note) => {
        return (
          <NoteItem key={note._id} note={note}></NoteItem>
        );
      })}
    </div> 
  );
}

export default Notes;
 