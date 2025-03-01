import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";
import Sidebar from "./Sidebar";
import NoteForm from "./NoteForm";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getNotes();
    const interval = setInterval(getNotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/create-notes", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      getNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    if (!selectedNote) return;

    try {
      await axios.put(`http://localhost:5000/update-notes/${selectedNote.id}`, {
        title,
        description,
      });
      setSelectedNote(null);
      setTitle("");
      setDescription("");
      getNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  const clearFields = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="note-list">
      <Sidebar
        notes={notes}
        handleNoteClick={handleNoteClick}
        setSelectedNote={setSelectedNote}
        clearFields={clearFields}
      />
      <NoteForm
        selectedNote={selectedNote}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        createNote={createNote}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
};

export default NoteList;
