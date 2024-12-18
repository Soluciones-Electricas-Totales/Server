
import multer from 'multer';
import path from 'path';
const FILES_PATH = `${process.cwd()}/_files`;

// const diskStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, FILES_PATH); // Folder to store the uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
//   }
// });

const uploader = multer({ storage: multer.memoryStorage() });

const extractContentFromBuffer = async (fileBuffer ) => {

  return fileBuffer.toString('utf-8');
}

export {
  uploader,
  extractContentFromBuffer
}