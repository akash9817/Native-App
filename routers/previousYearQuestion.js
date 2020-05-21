const express = require('express')
const router = express.Router()
const PYQ =  require('../models/previousYearQuestion')
const Subject =  require('../models/subject')
const upload = require('../middleware/upload')

router.post('/previousYearQuestion', upload.single('thumbnail'), async(req, res) => {
    var path = "/images/resume.pdf"
    console.log(req.file.destination)
    if(req.file !==undefined ){
        path = req.file.destination.slice(6) + "/" + req.file.filename;
    }
    const pyq = new PYQ(req.body)
    try{
        pyq.thumbnail = path
        await pyq.save()
        res.status(201).send(pyq)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/previousYearQuestion/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const pyq = await PYQ.findOne({'subject_id' : req.params.id})
        console.log('pyq  ' + pyq)
        res.send(pyq)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/previousYearQuestion', async (req, res) => {
        try{
            const pyq = await PYQ.find({},  '-_id subject_id')
            const arr = pyq.map((vi) => vi.subject_id)
            const subjects = await Subject.find({"_id" : {$in : arr}}).exec()
            res.send(subjects)
        }catch(e){
            res.status(400).send(e)
        }
})


module.exports = router