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
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
