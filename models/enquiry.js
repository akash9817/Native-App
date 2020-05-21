const mongoose = require('mongoose')
const enquirySchema = mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId},
    subject_id : {type : mongoose.Schema.Types.ObjectId, required : true},
    message :  {type : String, required : true},
    image : {type: String, default:'/images'},
    reply : {type : String},
    created_at : {type : Date, default : Date.now()}
})

const Enquiry = mongoose.model('Enquiry',enquirySchema)

module.exports = Enquiry