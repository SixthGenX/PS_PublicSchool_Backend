import express from "express";
import {
  createResult,
  deleteAllResults,
  deleteResultById,
  getResults,
  //   getResultByClassAndRoll,
} from "../controllers/result.controller";
import { isAdmin } from "../middlewares/admin.middleware";

const router = express.Router();

// Create a new result
router.post("/create", isAdmin, createResult);

router.get("/", getResults);

router.delete("/:id", isAdmin, deleteResultById);

router.delete("/", isAdmin, deleteAllResults);

// Get result by class and roll number
// router.get("/:class/:rollNumber", getResultByClassAndRoll);

export default router;
