import multer from 'multer';
// for processing  the image from the formdata
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'')
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
    }
});
const multerUploads = multer({ storage })
export { multerUploads };
