import Notes from "./Notes";
import AddNote from "./AddNote";
import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "./contexts/NoteProvider";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { updateNotes, getNotes } = useContext(NoteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
    getNotes();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({ eTitle: "", eDescription: "", eTag: "" });
  const modalRef = useRef(null);
  const updateNote = (id, note) => {
    setNote({
      _id: note._id,
      eTitle: note.title,
      eDescription: note.description,
      eTag: note.tag,
    });
    modalRef.current.click();
  };
  const noteChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      {/* Modal */}
      <div>
        <button
          className="d-none"
          ref={modalRef}
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        />
        <div
          className="modal fade"
          id="staticBackdrop"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <h1>Add Notes</h1>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="eTitle"
                      value={note.eTitle}
                      onChange={noteChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="eDescription"
                      value={note.eDescription}
                      onChange={noteChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      name="eTag"
                      value={note.eTag}
                      onChange={noteChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    await updateNotes(note._id, {
                      title: note.eTitle,
                      description: note.eDescription,
                      tag: note.eTag,
                    });
                    modalRef.current.click();
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      <Notes updateNote={updateNote} />
    </>
  );
};

export default Home;
