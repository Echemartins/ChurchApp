const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.split(".").pop();
        // console.log(file)
        const myFile = file.fieldname +"-" + Date.now() + "." + ext
        req.myFile = myFile
      cb(null, myFile)
    }
  });
  
  const upload = multer({ storage: storage });


  module.exports = upload