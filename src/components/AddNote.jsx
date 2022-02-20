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
  const handleFocus = () => {
    const form = document.getElementsByClassName("p-3 my-3 border border-3")[0];
    form.classList.add("shadow-lg");
    form.style.height = "100%";
  };
  const handleBlur = () => {
    const form = document.getElementsByClassName("p-3 my-3 border border-3")[0];
    form.classList.remove("shadow-lg");
    form.style.height = "140px";
  };
  return (
    <form
      className='p-3 my-3 border border-3'
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ height: "140px", overflow: "hidden" }}
    >
      <h1>Add Notes</h1>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          name='title'
          id='title'
          placeholder='Title'
          onChange={noteChange}
          value={note.title}
        />
        <label className='form-label' htmlFor='title'>
          Title
        </label>
      </div>
      <div className='form-floating mb-3'>
        <textarea
          className='form-control'
          name='description'
          id='description'
          placeholder="What's on your mind?"
          onChange={noteChange}
          value={note.description}
          style={{ height: "100px" }}
        />
        <label className='form-label' htmlFor='description'>
          Description
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          name='tag'
          id='tag'
          placeholder="What's the tag?"
          onChange={noteChange}
          value={note.tag}
        />
        <label className='form-label' htmlFor='tag'>
          Tag
        </label>
      </div>
      <button className='btn btn-primary d-block ms-auto' onClick={handleClick}>
        Add Note
      </button>
    </form>
  );
};

export default AddNote;
