import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";
import Sidebar from "./Sidebar";
import NoteForm from "./NoteForm";
import { BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getNotes();
    const interval = setInterval(getNotes, 5000); // refresh data setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk mengambil notes dari backend dengan Authorization token
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // ambil token dari localStorage
      if (!token) {
        console.warn("No access token found, please login.");
        return;
      }
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response?.data || error.message
      );
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/delete-notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${BASE_URL}/create-notes`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/update-notes/${selectedNote.id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
