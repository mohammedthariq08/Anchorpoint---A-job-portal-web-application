import RecruiterJobs from '../pages/RecruiterJobs';
import { useNavigate } from 'react-router-dom';

function Recruiterdashboard(){
    const navigate = useNavigate();
    return(
        <>
        <button onClick={()=>navigate('/postjob')}>Postjob</button>
        <RecruiterJobs/>
        </>
    )
}
export default Recruiterdashboard;