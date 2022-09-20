const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required:[true,'Please provide company'],
        maxlength: 50
    },
    position:{
        type:String,
        required:[true,'Please state the position'],
        maxlength:100
    },
    status:{
        type:String,
        enum: ['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true,'Please provide user']
    }
}, {timestamps:true})

module.exports = mongoose.model('Job',JobSchema)