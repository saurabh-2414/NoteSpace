import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);

  const handleUnauthorized = (response) => {
    if (response.status === 401) {
      sessionStorage.setItem(
        "sessionExpired",
        "Session expired, please login again.",
      );

      localStorage.removeItem("token");

      window.location.href = "/login";

      return true;
    }

    return false;
  };

  // Get all Notes
  const getNotes = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (handleUnauthorized(response)) return;

      const json = await response.json();

      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Get notes error:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (handleUnauthorized(response)) return false;

    const note = await response.json();

    if (response.ok) {
      setNotes((prevNotes) => prevNotes.concat(note));
      return true;
    }

    console.error("Add note API error:", note);
    return false;
  };

  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (handleUnauthorized(response)) return false;

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Delete note API error:", errorData);
      return false;
    }

    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

    return true;
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (handleUnauthorized(response)) return false;

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Edit note API error:", errorData);
      return false;
    }

    const updatedNote = await response.json();

    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? updatedNote : note)),
    );

    return true;
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
