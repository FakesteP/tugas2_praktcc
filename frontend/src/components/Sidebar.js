import React from "react";

const Sidebar = ({ notes, handleNoteClick, setSelectedNote, clearFields }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="title">Notepadd --</h1>
        <button
          className="add-note-button"
          onClick={() => {
            setSelectedNote(null);
            clearFields();
          }}
        >
          +
        </button>
      </div>
      <ul className="note-titles">
        {notes.map((note) => (
          <li key={note.id} onClick={() => handleNoteClick(note)}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;