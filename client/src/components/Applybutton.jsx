import api from '../api';
import { useState } from 'react';

function Applybutton({id}){
    const token = localStorage.getItem('token');
    const [resumeUrl,setResumeurl] = useState('');
    const [applied,setApplied] = useState(false);
    const jobId = id;
    const applyJob = async ()=>{
        try{
                await api.post('/applications/apply',
                {
                    jobId,
                    resumeUrl 
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}` 
                    }
                });
            setApplied(true); 
        }
        catch(err){
            console.log(err.response?.data)
        }
    };

    return (
        <>
        {
            !applied ? 
            (
                <div className='applyjob'>
                    <input type='url' onChange={(e)=>setResumeurl(e.target.value)} placeholder='Resume link'></input>
                    <button onClick={applyJob}>Apply</button>
                </div>
            ):
            (
                <p>Applied Successfully</p> 
            )
        }
        </>
    )
}
export default Applybutton;