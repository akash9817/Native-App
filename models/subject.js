const mongoose = require('mongoose')
const subjectSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Course'
    }

})

subjectSchema.virtual('videos',{
    ref : "Video",
    localField : '_id',
    foreignField : 'subject_id'
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject