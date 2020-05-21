const express = require('express')
const Subject = require('../models/subject')
const router = express.Router()
const Course = require('../models/course')
const upload = require('../middleware/upload')


router.post('/subject', upload.single('thumbnail'), async (req, res) => {
  var path = "/images/default.jpg"
    if(req.file !==undefined ){
        path = req.file.destination.slice(6) + "/" + req.file.filename;
    }

    const  subject = new Subject({
        name : req.body.name,
        thumbnail : 'placeholder',
        course_id : req.body.course_id
    })
    try{
        subject.thumbnail = path;
        await subject.save()
        res.status(201).send(subject)
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/subject/:id', async (req, res) => {
    const  course = await Course.findById(req.params.id)
    try{
        await course.populate('subjects').execPopulate()
        res.send(course.subjects)
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/subjects', async (req, res) => {
    var get = ''
  if(req.query.get){
      get = req.query.get
  }
    try{
        const  subjects = await Subject.find({}, get)
        res.send(subjects)
    }catch (e){
        res.status(400).send(e)
    }
})

module.exports = router