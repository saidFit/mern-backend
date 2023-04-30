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
// // // const filefilter = (req, file, cb) => {
// // //     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
// // //         || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jfif'){
// // //             cb(null, true);
// // //         }else {
// // //             cb(null, false);
// // //         }
// // // }

// const upload = multer({storage: storage});



// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'uploads', 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() 
//              + path.extname(file.originalname))
//             // file.fieldname is name of the field (image)
//             // path.extname get the uploaded file extension
//     }
// });

// const upload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
// }) 


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// var upload = multer({ storage: storage })

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set file size limit to 1 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImage'); // Set name of file field in HTML form

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}


module.exports = {upload};