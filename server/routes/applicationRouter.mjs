import Application from '../models/applications.mjs';
import { Router } from 'express';
import { authmiddleware,checkRole } from '../middleware/authmiddleware.mjs';
import Jobs from '../models/jobs.mjs';
import mongoose from 'mongoose';
const applicationRouter = Router();
const applyJob = async(req,res)=>{
    try{
        const { jobId,resumeUrl } = req.body;
        console.log(jobId) 
        const job = await Jobs.findById(jobId); 
        const candidateId = req.user.id;
        if(!job){
            return res.status(400).json({message: "Job not found"});
        }
        const existing = await Application.findOne({jobId,candidateId});
        if(existing){
            return res.status(200).json({message: "You already aplied"});
        }
        await Application.create({
            jobId,
            candidateId,
            resumeUrl,
            status: "Applied" 
        });
        res.status(200).json({message: "Applied Successfully"});
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: "Task Failed"});
    }
}
const getApplications = async (req,res)=>{
    try{
        const { jobId } = req.params;
        const applications = await Application.aggregate([
            { $match:{jobId: new mongoose.Types.ObjectId(jobId)}},
            { $lookup: {
                from: 'users',
                localField: 'candidateId',
                foreignField: '_id',
                as: 'applicants' 
            }},
            { $unwind: '$applicants'},
            { $project: {
                status: 1,
                name: '$applicants.name',
                email: '$applicants.email'
            }}
        ])
        res.status(200).json(applications);
    } 
    catch(err){
        res.status(400).json({message: "Task Failed"});
    }
} 
const getUserApplication = async (req,res)=>{
    const { id } = req.params; 
    const applications = await Application.aggregate([
        { $match: {candidateId: new mongoose.Types.ObjectId(id)}}, 
        { $lookup: {
            from: 'jobs',
            localField: 'jobId',
            foreignField: '_id',
            as: 'applications' 
        }},
        { $unwind: '$applications'},
        { $project: {
            'applications.title': 1,
            'applications.company': 1,
            'applications.description': 1,
            'applications.location': 1,
            'applications.salary': 1,
            'applications.skills': 1 
        }}
    ])
    res.status(200).json(applications) 
}
applicationRouter.post('/apply',authmiddleware,checkRole('candidate'),applyJob);
applicationRouter.get('/job/:jobId',authmiddleware,checkRole('recruiter'),getApplications);
applicationRouter.get('/user/:id',authmiddleware,checkRole('candidate'),getUserApplication);
export default applicationRouter;
