import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { connectMongoDB, connectToDatabase } from './mongodb';

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: { useUnifiedTopology: true },
  
  file: (req, file) => {
    return new Promise(async (resolve, reject) => {
      const db = await connectMongoDB()
      const collection = db.collection('fs.files');
      const filename = Date.now() + file.originalname;
      const fileInfo = {
        filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

export default upload;
