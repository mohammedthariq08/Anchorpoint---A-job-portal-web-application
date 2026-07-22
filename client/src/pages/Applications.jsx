import { useState,useEffect } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode';
function Application(){
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const id = decoded.id;
    const [applications,setApplications] = useState([]);
    const fetchData = async (id)=>{
        try{
            let res = await api.get(`/applications/user/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}` 
                }
            }
        );
        setApplications(res.data);
        }
        catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        fetchData(id);
    },[]); 

    return (
        <>
        {applications.length>0? (applications.map((a,index)=>(
            <div key={index}>
                <h2> Title: {a.applications.title}</h2>
                <h3> Company: {a.applications.company}</h3>
                <h4> Description: {a.applications.description}</h4>
                <h4> Location: {a.applications.location}</h4>
                <h4> Salary: {a.applications.salary}</h4>
                <h4>skills: {a.applications.skills.map((s,i)=>(
                    <p key={i}>{s}</p>
                ))}</h4>
            </div>)
        )) : (
            <p className='form-error'>No Applications</p>
        ) }
        </>
    )
}
export default Application;