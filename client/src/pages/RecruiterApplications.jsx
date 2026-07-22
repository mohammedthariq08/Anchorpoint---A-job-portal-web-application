import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function RecruiterApplications(){
    const { id } = useParams();
    const [applicants,setApplicants] = useState([]);
    const token = localStorage.getItem('token');

    const fetchApplications = async()=>{
        try{
            let res = await api.get(`/applications/job/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            setApplicants(res.data); 
        }
        catch(err){
            console.log(err.message); 
        }
    }
    useEffect(()=>{
        fetchApplications();
    },[])

    return(
        <>
        { applicants ? 
        (
            <>
            {
                applicants.map((a,i)=>(
                    <div key={i}>
                        <h4>{a.status}</h4>
                        <h4>{a.name}</h4>
                        <h4>{a.email}</h4>
                    </div>
                ))
            }
            </>
        ):
        (
            <p>No Applicants</p>
        )
        }
        </>
    )
}
export default RecruiterApplications;