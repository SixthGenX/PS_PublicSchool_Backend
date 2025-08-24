import express from "express";
import {
  createResult,
//   getResultByClassAndRoll,
} from "../controllers/result.controller";

const router = express.Router();

// Create a new result
router.post("/create", createResult);

// Get result by class and roll number
// router.get("/:class/:rollNumber", getResultByClassAndRoll);

export default router;
