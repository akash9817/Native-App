const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    thumbnail : {
        type : String,
        required : true,
    },
    is_active : {
        type : Number,
        default : 1
    }
})

courseSchema.virtual('subjects', {
    ref: "Subject",
    localField : "_id",
    foreignField : 'course_id'
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course