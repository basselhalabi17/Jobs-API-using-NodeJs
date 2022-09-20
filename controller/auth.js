const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const { BadRequest,Unauthenticated } = require('../errors')
//const jwt = require('jsonwebtoken')
const register = async (req,res)=>{
    

    const user = await User.create({...req.body})
    console.log(user)
    const token = user.getToken()
    console.log(token)
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
} 

const login = async (req,res)=>{
    const {email,password} = req.body
    
    
    
    if (!email || !password){
        throw new BadRequest('please provide email or password')
    }

    const user = await User.findOne({email})
    if (!user){
        throw new Unauthenticated('enter right credentials')
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch){
        throw new Unauthenticated('invalid password')
    }

    const token = user.getToken()
    console.log(token)
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports ={
    register,
    login
}