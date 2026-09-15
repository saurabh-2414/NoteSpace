import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { notes, loading, getNotes, editNote } = context;
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentnote) => {
    setNote({
      id: currentnote._id,
      edittitle: currentnote.title || "",
      editdescription: currentnote.description || "",
      edittag: currentnote.tag || "",
    });
    ref.current.click();
    // Remove focus from the button after opening/closing modal
    setTimeout(() => {
      document.activeElement?.blur();
    }, 100);
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    edittitle: "",
    editdescription: "",
    edittag: "",
  });

  const [updating, setUpdating] = useState(false);

  const handleClick = async () => {
    setUpdating(true);

    try {
      const success = await editNote(
        note.id,
        note.edittitle,
        note.editdescription,
        note.edittag,
      );

      if (success) {
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
      } else {
        props.showAlert("Unable to update note. Please try again.", "danger");
      }
    } catch (error) {
      console.error("Update note error:", error);

      props.showAlert(
        "Unable to connect to server. Please try again.",
        "danger",
      );
    } finally {
      setUpdating(false);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showAlert={props.showAlert} />

      {/* Hidden button to open modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Update Note
      </button>

      {/* Update Note Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            {/* Modal Header */}
            <div className="modal-header bg-dark text-white rounded-top-4">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                ✏️ Update Note
              </h1>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              <form>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="edittitle" className="form-label fw-semibold">
                    Title
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    id="edittitle"
                    name="edittitle"
                    value={note.edittitle || ""}
                    onChange={onChange}
                    placeholder="Enter note title"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label
                    htmlFor="editdescription"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>

                  <textarea
                    className="form-control rounded-3"
                    id="editdescription"
                    name="editdescription"
                    onChange={onChange}
                    value={note.editdescription || ""}
                    rows="4"
                    placeholder="Write your note..."
                  ></textarea>
                </div>

                {/* Tag */}
                <div className="mb-2">
                  <label htmlFor="edittag" className="form-label fw-semibold">
                    Tag
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    id="edittag"
                    name="edittag"
                    onChange={onChange}
                    value={note.edittag || ""}
                    placeholder="e.g. Work, Personal, Study"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-0 px-4 pb-4">
              <button
                type="button"
                ref={refClose}
                className="btn btn-outline-secondary rounded-pill px-4"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleClick();
                }}
                className="btn btn-dark rounded-pill px-4"
                disabled={
                  updating ||
                  note.edittitle.length < 5 ||
                  note.editdescription.length < 5
                }
              >
                {updating ? "Updating..." : "✓ Update Notes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {/* Your Notes Section */}
      <div className="container my-5">
        {/* Heading */}
        <div className="card-header bg-dark text-white text-center py-3 rounded-top-4">
          <h2 className="mb-0 fw-bold">📝 Your Notes</h2>
          <small className="text-light">Manage and organize your notes</small>
        </div>

        {/* Search Box */}
        <div className="row justify-content-center mb-5 mt-5">
          <div className="col-12 col-md-6">
            <div className="input-group shadow-sm rounded-3">
              <input
                type="text"
                className="form-control border-start-0 py-2"
                placeholder="Search notes by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        {/* Notes */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center">
            <div className="alert alert-light border shadow-sm rounded-4">
              📭 No notes to display
            </div>
          </div>
        ) : (
          (() => {
            const filteredNotes = notes.filter(
              (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.description.toLowerCase().includes(search.toLowerCase()),
            );

            if (filteredNotes.length === 0) {
              return (
                <div className="text-center">
                  <div className="alert alert-light border shadow-sm rounded-4">
                    🔍 No notes found matching your search.
                  </div>
                </div>
              );
            }

            return (
              <div className="row g-4">
                {filteredNotes.map((note) => {
                  return (
                    <Noteitem
                      key={note._id}
                      note={note}
                      updateNote={updateNote}
                      showAlert={props.showAlert}
                    />
                  );
                })}
              </div>
            );
          })()
        )}
      </div>
    </>
  );
};

export default Notes;
