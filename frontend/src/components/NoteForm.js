import React from "react";

const NoteForm = ({
  selectedNote,
  title,
  setTitle,
  description,
  setDescription,
  createNote,
  updateNote,
  deleteNote,
}) => {
  return (
    <div className="note-details">
      <form onSubmit={selectedNote ? updateNote : createNote}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="save-button">
          {selectedNote ? "Update Note" : "Add Note"}
        </button>
        {selectedNote && (
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteNote(selectedNote.id)}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
