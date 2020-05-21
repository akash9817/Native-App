const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type :String,
        trim:true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password : {
        type : String,
        minlength : 5,
    },
    image : {
        type : String
    },
    tokens : [{
            token : {
                type : String,
            } 
        }]
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    //delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function (authToken) {

    const user = this

    var token
    if(authToken != undefined){
        token= authToken
    }else{
        console.log('why boy why')
     token = jwt.sign({ _id: user._id.toString() }, process.env.JSON_WEBTOKEN)
    }
    user.tokens = user.tokens.concat({ token })
    //await user.save()

    return token
}


userSchema.statics.fetchByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    console.log("inside credential" + user)
    if(!user){
        throw new Error('unable to login')
    }
    const isTrue = await bcrypt.compare(password, user.password)
    console.log("isTrue" + isTrue)
    if(!isTrue){
        throw new Error('unable to login')
    }
    return user
}

userSchema.statics.fetchByAuth = async (email) => {
    const user = await User.findOne({email})
    return user
}

userSchema.pre('save', async function (next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User