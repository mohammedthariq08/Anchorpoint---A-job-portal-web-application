import { useState } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom' ;


function Login(){
    const navigate = useNavigate();
    const [formdata,setFormdata] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }
    const loginUser = async (e)=>{
        e.preventDefault();
        try{
            let res = await api.post('/user/login',formdata);
            let token = res.data.token;
            localStorage.setItem("token",token);
            const decoded = jwtDecode(token);
            if(decoded.role === 'recruiter'){
                navigate('/recruiterdashboard');
            }
            else if(decoded.role === 'candidate'){
                navigate('/userdashboard')
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    return(
        <>
        <div className="Loginform">
            <form onSubmit={loginUser}>
                <input type='text' name='email' placeholder='email' onChange={handleChange}></input>
                <input type='password' name='password' placeholder='password' onChange={handleChange}></input>
                <button type='submit'>Login</button> 
            </form>
        </div>
        </>
    )
}
export default Login;