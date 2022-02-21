import { createContext, useState } from "react";

const NoteContext = createContext();
const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "https://inotes-backend69.herokuapp.com";
  //   Method to fetch all notes from server
  const getNotes = async () => {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    let notesGot = await fetch(`${host}/api/notes/get-notes`, fetchOptions);
    notesGot = await notesGot.json();
    setNotes(notesGot);
  };
  //   Method to add notes
  const addNotes = async (note) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    };
    note = await fetch(`${host}/api/notes/create-notes`, fetchOptions);
    note = await note.json();
    setNotes([...notes, note]);
  };
  //   Method to delete notes
  const deleteNotes = async (id) => {
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    await fetch(`${host}/api/notes/delete-notes/${id}`, fetchOptions);
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };
  //   Method to update notes
  const updateNotes = async (id, note) => {
    const newNotes = [...notes];
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = note.title;
        newNotes[i].description = note.description;
        newNotes[i].tag = note.tag;
        break;
      }
    }
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    };
    note = await fetch(`${host}/api/notes/update-notes/${id}`, fetchOptions);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNotes, deleteNotes, updateNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export { NoteProvider, NoteContext };
