import mongoose from 'mongoose';
import validator from 'validator';

const applicationModel = mongoose.Schema(
    {
        candidateId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true 
        },
        jobId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
            required: true 
        },
        resumeUrl:{
            type: String,
            validate:{
                validator: validator.isURL,
                message: "Invalid Url"
            }
        },
        status:{
            type: String 
        },
        createdAt: {
            type: Date,
            default: Date.now 
        }
    }
)
applicationModel.index({jobId:1 , candidateId: 1}, {unique: true}); 
const Application = mongoose.model("Application", applicationModel)
export default Application 
