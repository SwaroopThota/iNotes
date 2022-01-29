import React, { useContext, useState } from "react";
import { NoteContext } from "./contexts/NoteProvider";

const AddNote = () => {
  const { addNotes } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const noteChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note);
    setNote({ title: "", description: "", tag: "" });
  };
  return (
    <form className="p-3 my-3 border border-3 rounded-3 shadow">
      <h1>Add Notes</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          onChange={noteChange}
          value={note.title}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          name="description"
          onChange={noteChange}
          value={note.description}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tag</label>
        <input
          type="text"
          className="form-control"
          name="tag"
          onChange={noteChange}
          value={note.tag}
        />
      </div>
      <button className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
  );
};

export default AddNote;
