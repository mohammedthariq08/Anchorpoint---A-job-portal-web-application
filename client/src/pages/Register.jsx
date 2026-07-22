import { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [formdata,setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        role: 'candidate'
    });
    const registerUser = async (e)=>{
        e.preventDefault();
        try{
            await api.post('/user/register',formdata);
            navigate('/login');
        }
        catch(err){
            console.log(err.message);
            const errorMessage = err.response?.data?.message
            if(errorMessage == 'User already exists'){
                setMessage('Email already exists')
            }
        }
    }
    const handleChange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }

    return(
        <>
            <div className="registerForm">
            <form onSubmit={registerUser}>
                <input type = 'text' name='name' placeholder='Username' onChange={handleChange} required></input>
                <input type='email' name='email' placeholder='email' onChange={handleChange} required></input>
                <input type='password' name='password' placeholder='password' onChange={handleChange} required></input>
                <select name='role' value={formdata.role} onChange={handleChange} required>
                    <option value='candidate'>Candidate</option>
                    <option value='recruiter'>Recruiter</option>
                </select>
                <button type='submit'>Register</button>
            </form>
            </div>
            <div>
                {message && (<p className='form-error'>{message}</p>)}
            </div>
            <div className="toLogin">
                Already have an account? <Link to='/login'>Login</Link>
            </div>
            </>
    )
}
export default Register;