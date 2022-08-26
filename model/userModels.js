const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    profilePic:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);