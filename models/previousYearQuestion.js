const mongoose = require('mongoose')

const PYQSchema = mongoose.Schema({
    title : String,
    thumbnail :String,
    subject_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject',
        unique : true
    },
})

const PYQ = mongoose.model('PreviousYearQuestion', PYQSchema)

module.exports = PYQ