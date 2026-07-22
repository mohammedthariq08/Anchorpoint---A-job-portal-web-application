import Jobs from '../pages/Jobs';
import { useNavigate } from 'react-router-dom';
function Userdashboard(){
    const navigate = useNavigate();
    return (
        <>
        <div className='userdashboard'>
            <Jobs/>
            <button onClick={()=>navigate('/applications')}>My Applications</button>
        </div>
        </>
    )
}
export default Userdashboard;