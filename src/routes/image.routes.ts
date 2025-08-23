import multer from "multer";
import express from "express";
import { getImage, uploadImage } from "../controllers/image.controller";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/:id", getImage);

export default router;
