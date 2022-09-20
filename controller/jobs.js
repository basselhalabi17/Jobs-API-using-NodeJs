const Job = require('../models/job')
const {StatusCodes} = require('http-status-codes')
const {BadRequest,NotFound} = require('../errors')

const getAllJobs = async (req,res)=>{
   const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}

const getJob = async (req,res)=>{
    const userId = req.user.userId
    const jobId =  req.params.id
    const job = await Job.findOne({
        _id : jobId,
        createdBy : userId 
    })

    if (!job){
        throw new NotFound('No job found')
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res)=>{
    const userId = req.user.userId
    const jobId =  req.params.id
    const {company,position} = req.body

    if (company === '' || position === ''){
        throw new BadRequest('Company/position cannot be empty')
    }
    const job = await Job.findOneAndUpdate({
        _id : jobId,
        createdBy : userId 
    },req.body,{
        new:true,runValidators:true})

    if (!job){
        throw new NotFound('No job found')
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req,res)=>{
    const userId = req.user.userId
    const jobId =  req.params.id

    const job = await Job.findOneAndDelete({
        _id : jobId,
        createdBy : userId 
    })

    if (!job){
        throw new NotFound('No job found')
    }
    res.status(StatusCodes.OK).send()
}

module.exports ={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}