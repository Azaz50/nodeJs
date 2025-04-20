const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files from uploads so you can view uploaded files if needed
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  }
});

// const fileFilter = (req, file, cb) => {
//   if (file.filename === 'userfile')
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed!'), false);
//   }
// };

//Only jpeg/png in first and second pdf only.

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'userfile'){
    if(file.mimetype =='image/jpeg' || file.mimetype == 'image/png'){
      cb(null, true);
    }else{
      cb(new Error('Only images are allowed!'), false)
    }
  }else if (file.fieldname === 'userdocuments'){
    if(file.mimetype =='application/pdf'){
      cb(null, true);
    }else{
      cb(new Error('Only PDF are allowed for Documents'), false)
    }
  }else{
      cb(new Error('unknown fields'), false)

  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3 MB
  },
  fileFilter: fileFilter
});


app.get('/', (req, res) => {
  res.render("myform");
});

// app.post('/submitform', upload.single('userfile'), (req, res) => {
//   res.send(req.file);
// });

app.post('/submitform', upload.fields([
  {name : 'userfile', maxCount: 1},
  {name : 'userdocuments', maxCount: 3}
]), (req, res) => {
  if (!req.files || req.files.length === 0){
    return res.status(400).send(`No file uploaded.`);
  }
  res.send(req.files);
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if(error.code === 'LIMIT_UNEXPECTED_FILE'){
      return res.status(400).send(`Error: Too many files uploaded`);
    }
    return res.status(400).send(`multer error: ${error.message} : ${error.code}`);
  }else if (error){
    return res.status(500).send(`Something went Wrong: ${error.message}`);
  }
  next();
})

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
