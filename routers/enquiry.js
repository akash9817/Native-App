const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Enquiry = require('../models/enquiry')
const upload = require('../middleware/upload')

router.post('/enquiry', auth, upload.single('thumbnail'), async(req, res) => {
    //console.log("req.body " + req.file ) 
    var path = '/images'
    if(req.file != undefined){
     path = req.file.destination.slice(6) + "/" + req.file.filename;
     console.log("path" + path)
    }
    console.log(req.body)
  const  enquiry = new Enquiry(req.body)
    try{

        enquiry.user_id = req.user._id
        enquiry.image = path;
        await enquiry.save()
        res.status(201).send(enquiry)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/random', auth, upload.single('myfile'), async (req, res) => {
    console.log('req.file  ' + req.file)
})

router.get('/enquiy', auth, upload.single('thumbnail'), async(req, res) => {
    try{
        const enquiries = await Enquiry.find({})
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router