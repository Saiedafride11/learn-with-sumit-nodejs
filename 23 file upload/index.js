const express = require('express');
const multer  = require('multer');
const path = require("path");
const port = 5000;

const UPLOADS_FOLDER = './uploads/';
// let upload = multer({  dest: UPLOADS_FOLDER })


// single file upload
// let upload = multer({ 
//   dest: UPLOADS_FOLDER,
//   limits: {
//     fileSize: 1000000 //1mb
//   },
//   fileFilter: (req, file, cb) => {
//     if ( file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
//       cb(null, true);
//     } else {
//       // cb(null, false);
//       cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
//     }
//   }
// })

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") + 
        "-" + 
        Date.now();

    cb(null, fileName + fileExt);
  },
});

let upload = multer({ 
  // dest: UPLOADS_FOLDER,
  storage: storage,
  limits: {
    fileSize: 1000000 //1mb
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
        if ( file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
          cb(null, true);
        } else {
          // cb(null, false);
          cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
        }
    }else if (file.fieldname === "doc") {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only .pdf format allowed!"));
        }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  }
})

const app = express()

// single file upload
// app.post('/', upload.single('avatar'), (req, res) => {
//   res.send('Hello World!')
// })

//multiple file upload
// app.post('/', upload.array('avatar', 3), (req, res) => {
//   res.send('Hello World!')
// })


// single multiple file upload
// app.post('/', upload.fields([
//     { name: 'avatar', maxCount: 1 },
//     { name: 'gallery', maxCount: 2 }
//   ]),(req, res) => {
//   res.send('Hello World!')
// })

// none file upload
// app.post('/', upload.none(), (req, res) => {
//   res.send('Hello World!')
// })


// single multiple file upload
app.post('/', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'doc', maxCount: 2 }
  ]),(req, res) => {
  res.send('Hello World!')
})


app.use((err, req, res, next) => {
  if(err){
    // res.status(500).send(err.message);

    if(err instanceof multer.MulterError){
      res.status(500).send("There was a upload error");
    }else{
      res.status(500).send(err.message);
    }
  }
  else{
    res.send("Success")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})