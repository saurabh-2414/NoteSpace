import { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [loading, setLoading] = useState(false);

  const { addNote } = context;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!note.title || !note.description) {
      props.showAlert("Please fill all the fields", "warning");
      return;
    }

    if (note.title.length < 5) {
      props.showAlert("Title must be at least 5 characters", "warning");
      return;
    }

    if (note.description.length < 5) {
      props.showAlert("Description must be at least 5 characters", "warning");
      return;
    }

    setLoading(true);

    try {
      const success = await addNote(note.title, note.description, note.tag);

      if (success) {
        setNote({
          title: "",
          description: "",
          tag: "",
        });

        props.showAlert("Note added successfully", "success");
      } else {
        props.showAlert("Unable to add note. Please try again.", "danger");
      }
    } catch (error) {
      console.error("Add note error:", error);

      props.showAlert(
        "Unable to connect to server. Please try again.",
        "danger",
      );
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-5">
      <div className="card border-0 shadow-sm rounded-4">
        {/* Header */}
        <div className="card-header bg-dark text-white text-center py-3 rounded-top-4">
          <h2 className="mb-0 fw-bold">📝 Add a Note</h2>
          <small className="text-light">
            Save your thoughts, ideas and important information
          </small>
        </div>

        {/* Form */}
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleClick}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-semibold">
                Title
              </label>

              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                id="title"
                name="title"
                placeholder="Mention your title here..."
                onChange={onChange}
                value={note.title}
                minLength={5}
                required
              />

              <div className="form-text">Minimum 5 characters</div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-semibold">
                Description
              </label>

              <textarea
                className="form-control rounded-3"
                id="description"
                name="description"
                placeholder="Write your description here..."
                rows="5"
                onChange={onChange}
                value={note.description}
                minLength={5}
                required
              ></textarea>

              <div className="form-text">Add some details about your note</div>
            </div>

            {/* Tag */}
            <div className="mb-4">
              <label htmlFor="tag" className="form-label fw-semibold">
                Tag
              </label>

              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                id="tag"
                name="tag"
                placeholder="e.g. Work, Personal, Study..."
                onChange={onChange}
                value={note.tag}
              />
            </div>

            {/* Button */}
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addnote;
