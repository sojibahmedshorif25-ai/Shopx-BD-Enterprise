import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'wb19kgrx',
  api_key: process.env.CLOUDINARY_API_KEY || '297334366111723',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'A93BU2B1e5-_97jewKFmH08UTYU',
  secure: true,
});

export default cloudinary;
