import React from "react";

const About = () => {
  return (
    <div className="container my-3">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">About NoteSpace</h1>

        <h3>Your Notes, Anywhere, Anytime</h3>

        <p className="lead">
          NoteSpace is a simple and secure place to keep your thoughts, ideas,
          tasks, and important information organized in one place.
        </p>

        <h4 className="mt-4">What can you do with NoteSpace?</h4>

        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">📝 Create new notes</li>

          <li className="list-group-item">✏️ Edit your existing notes</li>

          <li className="list-group-item">
            🗑️ Delete notes you no longer need
          </li>

          <li className="list-group-item">
            🔐 Keep your notes associated with your personal account
          </li>

          <li className="list-group-item">
            ☁️ Access and manage your notes whenever you need them
          </li>
        </ul>

        <h4 className="mt-4">Why NoteSpace?</h4>

        <p>
          We believe taking notes should be simple. NoteSpace provides a clean
          and easy-to-use experience so you can focus on your ideas instead of
          managing your notes.
        </p>

        <div className="text-center mt-4">
          <h5>Create. Organize. Remember.</h5>
          <p className="text-muted">Welcome to NoteSpace.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
