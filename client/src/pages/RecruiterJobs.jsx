import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function RecruiterJobs(){
    const [jobs,setJobs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const fetchData = async()=>{
        let res = await api.get('/jobs/recruiter',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setJobs(res.data);
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const deleteJob = async(id)=>{
        try{
            setJobs((prev)=>prev.filter(job=> job._id != id));
            await api.delete(`/jobs/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        catch(err){
            console.log(err.message);
        }
    }

    return(
        <>
        { jobs.length>0 ? (
            jobs.map((job)=>(
                <div key={job._id}>
                    <h3>Role: {job.title}</h3>
                    <h3>Company: {job.company}</h3>
                    <p>Description: {job.description}</p>
                    <p>Location: {job.location}</p>
                    <p>Salary: {job.salary}</p>
                    <h6>Skills:</h6> {job.skills?.map((s,i)=>(
                        <p key={i}>{s}</p>
                    ))}
                    <button type='button' onClick={()=>navigate(`/applicants/${job._id}`)}>View Applicants</button> 
                    <button type='button' onClick={()=>navigate(`/update/${job._id}`)}>Update</button>
                    <button type='button' onClick={()=>deleteJob(job._id)}>Delete</button>
                </div>
            ))
        )
        :
        (
            <h1>Add Your Jobs</h1> 
        )
        }
        </>
    )
}
export default RecruiterJobs; 