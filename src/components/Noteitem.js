import NoteContext from "../context/notes/noteContext";
import React, { useContext, useState } from "react";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="col-md-4 col-lg-3">
      <div
        className="card my-3 border-0 rounded-4 h-100"
        style={{
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="card-body p-4 d-flex flex-column">
          {/* Tag */}
          {note.tag && (
            <span className="badge bg-dark rounded-pill align-self-start mb-3 px-3 py-2">
              #{note.tag}
            </span>
          )}

          {/* Title */}
          <h5 className="card-title fw-bold mb-3">{note.title}</h5>

          {/* Description */}
          <p
            className="card-text text-secondary"
            style={{
              minHeight: "70px",
              lineHeight: "1.6",
            }}
          >
            {note.description}
          </p>

          {/* Divider */}
          <hr className="mt-auto" />

          {/* Actions */}
          <div className="d-flex justify-content-end align-items-center gap-3">
            {/* Edit */}
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => {
                updateNote(note);
              }}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              title="Edit Note"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {/* Delete */}
            {/* Delete */}
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => setShowDeleteModal(true)}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              title="Delete Note"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Delete Note?</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-0 text-secondary">
                  Are you sure you want to delete this note?
                </p>
              </div>

              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-danger rounded-pill px-4"
                  disabled={deleting}
                  onClick={async () => {
                    setDeleting(true);

                    try {
                      const success = await deleteNote(note._id);

                      if (success) {
                        setShowDeleteModal(false);
                        props.showAlert("Deleted Successfully", "success");
                      } else {
                        props.showAlert(
                          "Unable to delete note. Please try again.",
                          "danger",
                        );
                      }
                    } catch (error) {
                      console.error("Delete note error:", error);

                      props.showAlert(
                        "Unable to connect to server. Please try again.",
                        "danger",
                      );
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Noteitem;
