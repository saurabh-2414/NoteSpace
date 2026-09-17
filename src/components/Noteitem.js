import NoteContext from "../context/notes/noteContext";
import React, { useContext, useState } from "react";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
      <div
        className="card my-3 border-0 rounded-4 h-100"
        style={{
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.10)",
          transition: "all 0.25s ease",
          overflow: "hidden",
        }}
      >
        <div className="card-body p-4 d-flex flex-column">
          {/* Tag */}
          {note.tag && (
            <span
              className="badge bg-dark rounded-pill align-self-start mb-3 px-3 py-2"
              style={{
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              #{note.tag}
            </span>
          )}

          {/* Title */}
          <h5
            className="card-title fw-bold mb-3"
            style={{
              lineHeight: "1.4",
              wordBreak: "break-word",
            }}
          >
            {note.title}
          </h5>

          {/* Description */}
          <p
            className="card-text text-secondary mb-4"
            style={{
              minHeight: "72px",
              lineHeight: "1.6",
              fontSize: "0.95rem",
              wordBreak: "break-word",
            }}
          >
            {note.description}
          </p>

          {/* Divider */}
          <hr className="mt-auto mb-3" />

          {/* Actions */}
          <div className="d-flex justify-content-end align-items-center gap-2">
            {/* Edit */}
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => updateNote(note)}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title="Edit Note"
              aria-label="Edit Note"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {/* Delete */}
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => setShowDeleteModal(true)}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title="Delete Note"
              aria-label="Delete Note"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered px-3">
            <div
              className="modal-content border-0 shadow-lg rounded-4"
              style={{
                overflow: "hidden",
              }}
            >
              {/* Modal Header */}
              <div className="modal-header border-0 px-4 pt-4">
                <h5 className="modal-title fw-bold">Delete Note?</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  aria-label="Close"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body px-4">
                <p className="mb-0 text-secondary">
                  Are you sure you want to delete this note? This action cannot
                  be undone.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 px-4 pb-4">
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
                  {deleting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
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
