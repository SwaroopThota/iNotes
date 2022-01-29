import React, { useContext } from "react";
import { NoteContext } from "./contexts/NoteProvider";
import NoteItem from "./NoteItem";
const Notes = ({updateNote}) => {
  const { notes } = useContext(NoteContext);
  return (
    <div className="row my-3">
      {notes.map((note, index) => {
        return <NoteItem key={index} note={note} updateNote={updateNote}/>;
      })}
    </div>
  );
};

export default Notes;
