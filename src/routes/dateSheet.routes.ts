import express from 'express';
import multer from 'multer';
import { 
  createDateSheet, 
  updateDateSheet, 
  getDateSheets, 
  getDateSheetById 
} from '../controllers/dateSheet.controller';
import { ApiCodes } from '../models/apiModel/ApiCode';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

// Error handling middleware for multer
const handleMulterError = (err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(ApiCodes.BAD_REQUEST.statusCode).json({
        isError: true,
        message: 'File size too large. Maximum size is 5MB',
        apiCode: 'FILE_TOO_LARGE',
        statusCode: ApiCodes.BAD_REQUEST.statusCode,
      });
    }
    return res.status(ApiCodes.BAD_REQUEST.statusCode).json({
      isError: true,
      message: err.message,
      apiCode: 'UPLOAD_ERROR',
      statusCode: ApiCodes.BAD_REQUEST.statusCode,
    });
  } else if (err) {
    return res.status(ApiCodes.INTERNAL_SERVER_ERROR.statusCode).json({
      isError: true,
      message: 'Error uploading file',
      apiCode: 'UPLOAD_ERROR',
      statusCode: ApiCodes.INTERNAL_SERVER_ERROR.statusCode,
    });
  }
  next();
};

// Create a new date sheet
router.post(
  '/',
  upload.single('image'),
  handleMulterError,
  createDateSheet
);

// Update a date sheet
router.put(
  '/:id',
  upload.single('image'),
  handleMulterError,
  updateDateSheet
);

// Get all date sheets with optional filtering
router.get(
  '/',
  getDateSheets
);

// Get a single date sheet by ID
router.get(
  '/:id',
  getDateSheetById
);

export default router;
