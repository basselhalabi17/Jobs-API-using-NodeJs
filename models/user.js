const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength: 3,
        maxlength : 50
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        match:[
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/ ,'Please provide valid mail'
        ],
        unique:true
    },

    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength: 6
    }
})

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})

userSchema.methods.comparePassword = async function(pass){
    console.log(pass)
    console.log(this.password)
    const isMatch = await bcrypt.compare(pass,this.password)
    return isMatch
}

userSchema.methods.getToken = function (){
    const token =  jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,
                        {expiresIn:process.env.JWT_LIFETIME})
    return token
}

module.exports = mongoose.model('User',userSchema)