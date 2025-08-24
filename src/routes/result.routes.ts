import express from "express";
import {
  createResult,
  deleteAllResults,
  deleteResultById,
  getResults,
  //   getResultByClassAndRoll,
} from "../controllers/result.controller";

const router = express.Router();

// Create a new result
router.post("/create", createResult);

router.get("/", getResults);

router.delete("/:id", deleteResultById);

router.delete("/", deleteAllResults);

// Get result by class and roll number
// router.get("/:class/:rollNumber", getResultByClassAndRoll);

export default router;
