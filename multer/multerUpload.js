const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// });

// const storage = multer.diskStorage({
//     destination:function (req,file,cb) {
//         cb(null,"uploads")
//     },
//     filename:function (req,file,cb) {
//         cb(null,file.originalname)
//     }
// })
// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
//         || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jfif'){
//             cb(null, true);
//         }else {
//             cb(null, false);
//         }
// }

// const upload = multer({storage: storage});

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})

module.exports = {upload}