import React, { useContext } from "react";
import { NoteContext } from "./contexts/NoteProvider";
import NoteItem from "./NoteItem";
const Notes = ({ updateNote }) => {
  const { notes } = useContext(NoteContext);
  return (
    <div className='row my-3'>
      {notes.length === 0 ? (
        <p className='text-text-muted'>Wow so empty.... UwU</p>
      ) : (
        notes.map((note, index) => {
          return (
            <NoteItem
              key={index}
              note={note}
              updateNote={updateNote}
              index={index}
            />
          );
        })
      )}
    </div>
  );
};

export default Notes;
