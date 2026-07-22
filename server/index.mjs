import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.mjs';
import applicationRouter from './routes/applicationRouter.mjs';
import userRouter from './routes/userRouter.mjs';

const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173' ,
        credential:true
    }
))
app.use(express.json())
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB Connected'))
.catch((err)=>console.log(err.message));

app.use('/user',userRouter);
app.use('/jobs',jobRouter);
app.use('/applications',applicationRouter);  

app.listen(process.env.PORT, ()=> console.log(`Server is connected in Port ${process.env.PORT}`));
