import mongoose from 'mongoose';

const jobModel = mongoose.Schema(
    {
        title:{
            type: String,
            required: true 
        },
        company:{
            type: String,
            required: true 
        },
        description:{
            type: String,
            required: true 
        },
        location:{
            type: String,
            required: true 
        },
        salary:{
            type: String,
            required: true 
        },
        skills:{
            type: Array
        },
        recruiterId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true 
        },
        createdAt:{
            type: Date,
            default: Date.now 
        }
    }
)
jobModel.index({createdAt: -1})
const Jobs = mongoose.model("Jobs", jobModel)
export default Jobs 