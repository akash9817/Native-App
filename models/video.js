const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    title : String,
    thumbnail :String,
    video_id : String,
    subject_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject',
        unique : true
    },
    views : {type : Number, default : 0},

    comments : [{
            userPic : {type : String, default : '/images/course/course.jpg'},
            username : {type : String},
            message : {
                type : String,
                default : 'default'
            }
        }]

})

// videoSchema.methods.addComment =  async function(data) {
//     const video = this
//     var comments = []
//     comments = video.comments.slice()
//     console.log('before ' +  comments)
//     var x = comments.concat(
//         {
//             // user_id : data.user_id,
//         message : data.message})
//         console.log('after  ' + x)
//     video.comments = comments
    
//      console.log(video)               
//      return video               
// }

const Video = mongoose.model('Video', videoSchema)

module.exports = Video