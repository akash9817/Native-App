const mongoose = require('mongoose')

const videoCommentSchema = mongoose.Schema({
    user_id : mongoose.Schema.Types.ObjectId,
    video_id : mongoose.Schema.Types.ObjectId,
    comment : String,
    created_at : {
        type : Date,
        default : Date.now
    }
})

const VideoComment = mongoose.model('VideoComment', videoCommentSchema)

module.exports = VideoComment