import multer from 'multer'

const storage=multer.memoryStorage();

const singleUpload=multer({storage}).array('files');

export default singleUpload;