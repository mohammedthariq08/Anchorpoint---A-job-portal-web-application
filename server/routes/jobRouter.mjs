import { Router } from 'express';
import Jobs from '../models/jobs.mjs';
import { authmiddleware,checkRole } from '../middleware/authmiddleware.mjs';
let jobRouter = Router();

const postJobs = async(req,res)=>{
    try{
        const { title,company,description,location,salary,skills} = req.body;
        const newPost = await Jobs.create({
            title,
            company,
            description,
            location,
            salary,
            skills,
            recruiterId: req.user.id  
        })
        res.status(201).json({message: "Job created Successfully"});
    }
    catch(err){
        res.status(400).json({message: "Task Failed"});
    }
}
const getJob = async(req,res)=>{
    try{
        const { id } = req.params;
        const job = await Jobs.findById(id);
        res.status(200).json(job) 
    }
    catch(err){
        res.status(400).json({message: "Task failed"})
    } 
}
const getJobs = async (req,res)=>{
    try{
        const { title,location,page } = req.query;
        let filter = {}
        if(title){
            filter.title = {$regex : title, $options: 'i'};
        }
        if(location){
            filter.location = location 
        }
        const totalJobs = await Jobs.countDocuments(filter);
        const limit = 10;
        const totalPages = Math.ceil(totalJobs/limit);
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber-1)*limit;
        const filteredJobs = await Jobs.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
        res.status(200).json({filteredJobs,totalPages});
    }
    catch(err){
        res.status(400).json({message: "Task Failed"})
    }
}
const getAllJobs = async (req,res)=>{
    try{
        const recruiterId = req.user.id;
        const jobs = await Jobs.find({recruiterId: recruiterId}).sort({createdAt: -1});
        res.status(200).json(jobs);
    }
    catch(err){
        res.status(400).json({message: "Task Failed"});
    }
}
const updateJob = async(req,res)=>{
    try{
        const { id } = req.params; 
        const { title,company,location,salary,skills } = req.body;
        const updated = await Jobs.findByIdAndUpdate(id, {title,company,location,salary,skills,updatedAt: Date.now},{new: true});
        res.status(200).json(updated);
    }
    catch(err){
        res.status(400).json({message: "Task Failed, Job not updated"})
    }
}
const deleteJob = async(req,res)=>{
    try{
        const { id } = req.params;
        await Jobs.findByIdAndDelete(id);
        res.status(200).json({message: "Job deleted seccessfully"})
    }
    catch(err){
        res.status(400).json({message: "Task failed, Job not deleted"});
    }
}

jobRouter.post('/post',authmiddleware,checkRole('recruiter'),postJobs); 
jobRouter.get('/',authmiddleware,checkRole('candidate'),getJobs);
jobRouter.get('/recruiter',authmiddleware,checkRole('recruiter'),getAllJobs); 
jobRouter.get('/:id',authmiddleware,getJob);
jobRouter.put('/:id',authmiddleware,checkRole('recruiter'),updateJob);
jobRouter.delete('/:id',authmiddleware,checkRole('recruiter'),deleteJob);
export default jobRouter; 