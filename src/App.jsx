import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import MyPage from './component/MyPage'
import Inventaris from './component/page/Inventaris'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Navbars from './component/Navbars'
import SuratMasuk from './component/page/surat/SuratMasuk'
import Login from './component/page/Login'
import Upload from './component/page/crud/Upload'
import Uploads from './component/page/klasifikasi/Upload'
import Edit from './component/page/crud/Edit'
import EditKlas from './component/page/klasifikasi/Edit'
import Detail from './component/page/crud/Detail'
import SuratKeluar from './component/page/surat/SuratKeluar'
import User from './component/page/User'
import TableData from './component/page/klasifikasi/Table'
import Axios from 'axios'

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const isLoggedIn = localStorage.getItem("token") !== null;
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/Login' || location.pathname === '/register' || location.pathname === '/login';
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    getKlasifikasi();
    window.scrollTo(0, 0);
  }, []); 
  const [getKonten,setKonten]= useState([]);
  const getKlasifikasi = async () => {
      const response = await Axios.get("http://localhost:8000/api/klasifikasi");
      setKonten(response.data);
    };
  return (
    <div className='flex w-full'>
      {!isLoginOrRegister && 
        <div className='h-screen overflow-y-auto'>
          <MyPage isOpen={isOpen}/>
          <div className={`z-10 top-0 py-3 text-left bg-white fixed w-full ${isOpen ? 'ml-72' : 'ml-10'}`}>
            <button onClick={toggleSidebar}>
              <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faBars}/>
            </button>
            <Navbars isOpen={isOpen}/>
          </div>
        </div>
      }
      <div className={`w-full  ${isOpen && !isLoginOrRegister ? 'ml-72' : 'ml-0'} ${isLoginOrRegister ? '':'mr-6 ml-10 my-16'} overflow-y-auto`} >
        <Routes>
          {isLoggedIn?(<>
            <Route path='/*' element={<Navigate to='/'/>}/>
            <Route path='/' element={<Inventaris />}/>
            <Route path='/edit/:id' element={<Edit/>} />
            <Route path='/edit/klasifikasi/:id' element={<EditKlas/>} />
            <Route path='/surat/:id' element={<Detail/>} />
            <Route path='/surat-masuk' element={<SuratMasuk />}/>
            <Route path='/surat-keluar' element={<SuratKeluar />}/>
            <Route path='/upload' element={<Upload />}/>
            <Route path='/klasifikasi' element={<TableData getKonten={getKonten} />}/>
            <Route path='/upload/klasifikasi' element={<Uploads />}/>
            <Route path='/user' element={<User />}/>
            <Route path='/login' element={<Navigate to='/'/>}/>
          </>):(<>
            <Route path='/' element={<Navigate to='/login'/>}/>
            <Route path='/*' element={<Navigate to='/login'/>}/>
            <Route path='*' element={<Navigate to='/login'/>}/>
            <Route path='/login' element={<Login />}/>
          </>)}
        </Routes>
        {/* <TableData /> */}
      </div>
    </div>
  )
}

export default App
