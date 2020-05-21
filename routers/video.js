const express = require('express')
const Subject = require('../models/subject')
const Video = require('../models/video')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/video', async (req, res) => {
    const  video = new Video(req.body)
    try{
        await video.save()
        res.status(201).send(video)
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/video/:id', async (req, res) => {
    const  subject = await Subject.findById(req.params.id)
    try{
        await subject.populate('videos').execPopulate()
        res.send(subject.videos[0])
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/videos', async (req, res) => {
    try{
    const  video = await Video.find({}, "-_id subject_id")
       const arr = video.map((vi) => vi.subject_id)
       const subject = await Subject.find({"_id" : {$in : arr}}).exec()
        res.send(subject)
    }catch (e){
        res.status(400).send(e)
    }
})

router.post("/comment", auth, async (req, res) => {
    try{
        const video = await Video.findByIdAndUpdate(req.body.video_id,{
            $push : {comments : 
                {
                 username : req.user.name,   
                 message : req.body.message
                }
            }},
            {new : true}
    )
        res.send(video)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router