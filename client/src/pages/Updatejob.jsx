import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
function Updatejob(){
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [updated,setUpdated] = useState(false);
    const [formdata,setFormdata] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        salary: ''
    });
    const [skills,setSkills] = useState([]);
    const [skillInput,setSkillinput] = useState('');
    const fetchData = async ()=>{
        let res = await api.get(`/jobs/${id}`);
        setFormdata(res.data);
        setSkills(res.data.skills || []);
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const handleChange = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value 
        });
    }
    const addSkill = (e)=>{
        e.preventDefault();
        if(skillInput.trim() === '') return;
        setSkills([...skills, skillInput]);
        setSkillinput('');
    }
    const putJob = async(e)=>{
        e.preventDefault();
        const data = { ...formdata, skills}
        await api.put(`/jobs/${id}`,data,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setUpdated(true); 
    }

    return(
        <>
        { !updated ? 
        (
            <form onSubmit={putJob}>
                <h4>Role: <span><input type = 'text' name='title' value={formdata.title} onChange={handleChange}></input></span></h4>
                <h4>Company: <span><input type='text' name='company' value={formdata.company} onChange={handleChange}></input></span></h4>
                <h4>Description: <span><textarea name='description' value={formdata.description} onChange={handleChange}></textarea></span></h4>
                <h4>Location: <span><input type='text' name='location' value={formdata.location} onChange={handleChange}></input></span></h4>
                <h4>Salary: <span><input type='text' name='salary' value={formdata.salary} onChange={handleChange}></input></span></h4>
                <h4>Skills: <span><input type='text' name='skills' onChange={(e)=>setSkillinput(e.target.value)}></input></span><span><button onClick={addSkill}>Add</button></span></h4>
                <button type='submit'>Update</button>
            </form>
        )
        :
        (
            <p>Updated Successfully</p>
        ) 
        }
        </>
    )
}
export default Updatejob;
