const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {Unauthenticated} = require('../errors')

const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauthenticated('Authorization invalid')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:payload.userId,name:payload.name}
        next()
    }
    catch(err){
        throw new Unauthenticated('authentication invalid')
    }
}

module.exports = auth