import express from "express";
import cors from "cors";
import notesRouter from "./routes/notesRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(notesRouter);

app.listen(5000, () => console.log("Server Berjalan"));
