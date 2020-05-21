const multer = require("multer");
const fs = require('fs')

var name ='default'
var storage = multer.diskStorage({
      destination: function (request, file, callback) {
        name = request.path.slice(1)
        if(name == 'login'){
          name = 'user'
        }
        var uploadPath = `public/images/${name}`
        fs.exists(uploadPath, function(exists) {
          if(!exists) {
            fs.mkdir(uploadPath, function(err) {
              if(err) {
                console.log('Error in folder creation');
              }  
        callback(null, uploadPath);
            })
          }
          else{
        callback(null, uploadPath);
  
          }
        })
      },
      filename: function (request, file, callback) {
        console.log(file);
         name = request.path.slice(1)
        var fileExtension = file.originalname.split(".")[1];
    
        return callback(null, `${name}-${Date.now()}.${fileExtension}`);
      },
    });
  
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

var upload = multer({ storage: storage });
  
module.exports = upload