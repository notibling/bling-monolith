import { Router } from 'express';
import multer from 'multer';

const storage = multer({
  storage: multer.memoryStorage(),
})
// * Handlers
import UploadFileHandler from './handlers/UploadFile';

const FilesRouter = Router();

FilesRouter.post('/upload', storage.array('files'), UploadFileHandler);

export { FilesRouter }