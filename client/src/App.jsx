import Register from './pages/Register';
import Login from './pages/Login';
import Protectedroute from './pages/Protectedroute';
import Userdashboard from './dashboards/Userdashboard';
import Recruiterdashboard from './dashboards/Recruiterdashboard';
import Postjob from './pages/Postjob';
import RecruiterApplications from './pages/RecruiterApplications';
import Updatejob from './pages/Updatejob';
import Jobcard from './components/Jobcard';
import Applications from './pages/Applications';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/register'/>}  ></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/userdashboard' element={<Protectedroute role='candidate'>
                    <Userdashboard></Userdashboard>
                </Protectedroute>}></Route>
                <Route path='/recruiterdashboard' element={<Protectedroute role='recruiter'>
                    <Recruiterdashboard/>
                </Protectedroute>}></Route>
                <Route path='/postjob' element={<Protectedroute role='recruiter'>
                    <Postjob/>
                </Protectedroute>}></Route>
                <Route path='/applicants/:id' element={<Protectedroute role='recruiter'>
                    <RecruiterApplications/>
                </Protectedroute>}/>
                <Route path='/update/:id' element={<Protectedroute role='recruiter'>
                    <Updatejob/>
                </Protectedroute>}></Route>
                <Route path='/jobdetails/:id' element={<Protectedroute role='candidate'>
                    <Jobcard/>
                </Protectedroute>}></Route>
                <Route path='/applications' element={<Protectedroute role='candidate'>
                    <Applications/>
                </Protectedroute>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App;