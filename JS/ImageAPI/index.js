const express =require('express');
const multer = require('multer') ;
const path = require('path');
const app = express();


//front page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

})
//storgae
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const maxSize = 1 * 10000 * 3000; //9 mb
//uploadE
var upload = multer({ 
    storage: storage,
    limits : { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 





}).single('mypic');

app.post("/upload",function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 9MB or uploading different file type)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            res.send("Success, Image uploaded!")
        }
    })
})










//deploy front page
app.listen(5000, () => {
    console.log("API is running");
})      


