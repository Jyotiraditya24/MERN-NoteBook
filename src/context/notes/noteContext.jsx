import { useState } from "react";
import { createContext } from "react";

export const NoteContext = createContext();

const NoteContextProvider = (props) => {
  const notesInitial = [
    {
      _id: "63d13c115ca851423ff22466",
      user: "63d13b4af41064549b53672f",
      title: "MySelf",
      description: "hello this is jyotiraditya !!",
      tag: "general",
      date: "2023-01-25T14:26:25.133Z",
      __v: 0,
    },
    {
      user: "63c05be3e401ae106a690667",
      title: "Second title",
      description: "this is a second paragraph",
      tag: "general",
      _id: "63d63970e230347214b004b1",
      date: "2023-01-29T09:16:32.067Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  //   ADD A NOTE
  const addNote = (title, description, tag) => {
    // API CALL
    const note = {
      user: "63c05be4e401ae106a690667",
      title: title,
      description: description,
      tag: tag,
      _id: "63d63970e230347214b004b1",
      date: "2023-01-29T09:16:32.067Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // DELETE  A NOTE
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id));
  };

  // EDIT A NOTE
  const editNote = (id, title, description, tag) => {
    
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
