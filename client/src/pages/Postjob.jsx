import { useState } from 'react';
import api from '../api';


function Postjob(){
    const [formdata,setFormdata] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        salary: ''
    });
    const token = localStorage.getItem('token');
    const [skills,setSkills] = useState([]);
    const [skillInput,setSkillinput] = useState('');
    const [posted,setPosted] = useState(false);
    const post = async (e)=>{
        e.preventDefault();
        const job = {
            ...formdata,
            skills 
        }
        await api.post('/jobs/post',job,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setPosted(true);
    }
    const handleChange = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value 
        });
    };
    const addSkill = ()=>{
        if(skillInput.trim() === '') return;
        setSkills([...skills,skillInput]);
        setSkillinput('');
    }

    return(
        <>
        { !posted? 
        (
            <>
            <form onSubmit={(e)=>post(e)}>
                <h5> Role: <span><input type='text' name='title' onChange={handleChange}></input></span></h5>
                <h5> Company: <span><input type='text' name='company' onChange={handleChange}></input></span></h5>
                <h5> Description: <span><textarea name='description' onChange={handleChange}></textarea></span></h5>
                <h5> Location: <span><input type='text' name='location' onChange={handleChange}></input></span></h5>
                <h5> Salary: <span><input type='text' name='salary' onChange={handleChange}></input></span></h5>
                <h5> Skills: <span><input type='text' name='skills' onChange={(e)=>setSkillinput(e.target.value)}></input></span> <span><button type ='button' onClick={addSkill}>Add</button></span></h5>
                <button type='submit'>Add Job</button>
            </form>
            </>
        ):
        (
            <p>Job Added Successfully</p>
        )
        }
        </>
    )
}
export default Postjob;