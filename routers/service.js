const express = require('express')
const router = express.Router()
const service = require('../helpers/service')
const Course = require('../models/course')

router.post('/sendmail', async (req, res) => {

    try{
     const response = await service.sendmail()
        res.send()
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/search', async (req, res) => {
    var field = req.query.field
    var searchKey = req.query.searchKey
    try{
        var course = await Course.find({})
        var response =  service.search(course, searchKey)
    console.log(response)
    }catch(e){  
        res.send(e)
    }
    
})

module.exports = router