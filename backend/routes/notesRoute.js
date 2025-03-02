import express from "express";
import { createNote, deleteNote, getNotes, updateNote, getNoteById, } from "../controller/notesController.js";

const router = express.Router();
router.get("/notes", getNotes);
router.get("/notes/:id", getNoteById);
router.post("/create-notes", createNote);
router.put("/update-notes/:id", updateNote);
router.delete("/delete-notes/:id", deleteNote);

export default router;
