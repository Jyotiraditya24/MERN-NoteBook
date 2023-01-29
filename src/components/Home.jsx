import React from "react";
import { useContext } from "react";
import { NoteContext } from "../context/notes/noteContext";

const Home = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;

  return (
    <div className="container">
      <h1>ADD A NOTE</h1>
      <h1 className="my-3">Your Notes</h1>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      {/* Mapping Notes */}
      <div className="container my-5">
        <h1 style={{ textAlign: "center" }}>Note Section</h1>
        {notes.map((note) => {
          return (
            <div style={{ textAlign: "center" }}>
              <ul>
                <li>{note.title}</li>
                <li>{note.description}</li>
                <li>{note.tag}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
