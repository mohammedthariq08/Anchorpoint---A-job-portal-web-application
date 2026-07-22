import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Applybutton from './Applybutton.jsx';
import api from '../api.js';

function Jobcard(){
    const token = localStorage.getItem('token'); 
    const [job,setJob] = useState();
    const [apply, setApply] = useState(false);
    const { id } = useParams();
    const fetchData = async()=>{
        console.log(id);
        let res = await api.get(`/jobs/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setJob(res.data);
    }
    useEffect(()=>{
        fetchData();
    },[]) 

    return(
        <>
        {
            !job ? (
                <p>Loading...</p>
            ) 
            :
            (
            <>
            <div className='jobcard'>
                <h1>Role: {job.title}</h1>
                <h3>Company: {job.company}</h3>
                <p>Job Description: {job.description}</p>
                <h4>Location: {job.location}</h4>
                <h4>Salary: {job.salary}</h4>
                <h5>Required Skills: </h5>{job.skills?.map((s)=>(
                    <p key={s}>{s}</p>
                ))}
                <button onClick={()=>setApply(true)}>Apply Now </button>
            </div>
            {apply && (
                <Applybutton id={id} />
            )}
            </>
            )
        }
        </>
    )
}
export default Jobcard;