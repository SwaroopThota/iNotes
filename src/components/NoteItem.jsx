import React, { useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NoteContext } from "./contexts/NoteProvider";
const NoteItem = ({ note,updateNote }) => {
  const { deleteNotes } = useContext(NoteContext);
  const deleteNote = () => {
    deleteNotes(note._id);
  };
  return (
    <div className="col-md-4">
      <div className="card shadow my-3">
        <h5 className="card-header d-flex justify-content-between align-items-center">
          {note.title}
          <div>
            <i
              className="bi bi-trash text-danger h3 mx-2"
              style={{ cursor: "pointer" }}
              onClick={deleteNote}
            />
            <i
              className="bi bi-pencil-square text-info h3"
              style={{ cursor: "pointer" }}
              onClick={()=>{ updateNote(note._id,note); }}
            />
          </div>
        </h5>
        <div className="card-body">
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
