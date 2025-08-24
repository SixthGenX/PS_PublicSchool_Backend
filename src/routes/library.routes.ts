import express from "express";
import { addOrUpdateLibraryBook } from "../controllers/library.controller";

const router = express.Router();

// Add/Update book
router.post("/", addOrUpdateLibraryBook);

export default router;
