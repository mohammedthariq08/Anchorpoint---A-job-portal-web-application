import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import Pagination from './Pagination.jsx';
import Search from './Search.jsx';
function Jobs(){
    const token = localStorage.getItem("token");
    const [jobs,setJobs] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalpage] = useState();
    const [title,setTitle] = useState('');
    const [location,setLocation] = useState('');
    const navigate = useNavigate();
    const fetchData = async()=>{
        let res = await api.get(`/jobs/`, {
            params:{
                title: title || undefined,
                location: location || undefined,
                page: page 
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    ); 
        setJobs(res.data.filteredJobs); 
        setTotalpage(res.data.totalPages)
    }
    useEffect( ()=>{
        fetchData();
    },[page]);

    return(
        <>
        <Search setTitle={setTitle} setLocation={setLocation} fetchData={fetchData}/>  
        { jobs.map((job)=>(
            <div key={job._id} className="jobs" onClick={()=>navigate(`/jobdetails/${job._id}`)}> 
                <h3>{job.title}</h3>
                <h5>{job.company}</h5>
                <h5>{job.location}</h5>
            </div>
        ))}
        <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </>
    )
}
export default Jobs;