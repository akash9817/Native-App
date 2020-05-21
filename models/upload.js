// const express = require('express')
// const multer = require('multer')
// const router = express.Router()


// function UploadData(path,id,field){
// const storage = multer.diskStorage({
//     destination : function(req, file, cb){
//         cb(null, `public/images/${field}`)
//     },
//     filename : function (req, file, cb){
//          fileExtension = file.originalname.split('.')[1]

//         cb(null, `${path}-${id}.${fileExtension}`)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
//         cb(null, true)
//     }else{
//         cb(null, false)
//     }
// }

//     const upload = multer({
//         storage : storage,
//         // limits : {
//         //     fileSize : 1024 * 1024 * 5
//         // },
//     })


//     var form = new FormData();
//     form.append('file', file);
  
//     // add URL for api
//     let apiUploadUrl;
  
//     let token = getToken();
//     let uploded = false;
//     let data = await fetch(apiUploadUrl, {
//       method: 'POST',
//       headers: {
//         'x-auth-token': token
//       },
//       body: form
//     });
  
  

//     router.post('/upload', upload.single('file'), async(req, res) =>{
//             Console.log(req.file)
//     })
// }

// module.exports = UploadData 

// var storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//         callback(null, 'public/images/course');
//     },
//     filename: function (request, file, callback) {
//         console.log(req.file)
//         if (request.files) {
//             console.log(file)
//            // TODO: consider adding file type extension
//            fileExtension = file.originalname.split('.')[1]
//            return callback(null, `${request.path}-${request.files[0]._id.toString()}.${fileExtension}`);
//         }
//         // fallback to the original name if you don't have a book attached to the request yet.
//         return callback(null, file.originalname)
//     }
// });

// var storage = multer.diskStorage({
//   destination: function (request, file, callback) {
//       console.log(request.path.slice(1))
//     callback(null, "public/images/course");
//   },
//   filename: function (request, file, callback) {
//     console.log(file);
//     var fileName = file.originalname.split(".")[0];
//     var fileExtension = file.originalname.split(".")[1];

//     return callback(null, `${fileName}-${Date.now()}.${fileExtension}`);
//   },
// });

// var upload = multer({ storage: storage });
// router.post('/course', z.array(), function(req,res,next){
//     console.log(req.body)
//     const course = new Course({
//         name : req.body.name,
//         thumbnail : req.body.name
//     })
//     //console.log(course)
//     //req.data = course
//     next()
// }, upload.single('thumbnail'), async (req, res) => {
//      //console.log(req.body)
//     // console.log(req.file)

//     //console.log(course)
//     console.log(req.data)
//     try{
//         //await course.save()
//         //UploadData('course',course._id,"thumbnail")
//         // await course.save()
//         res.status(201).send()
//     }catch (e){
//         res.status(400).send(e)
//     }
// })
// upload.single('thumbnail'),