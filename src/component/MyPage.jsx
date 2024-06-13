import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiUser,HiHome } from 'react-icons/hi';
import img from '../assets/logo-dispora.png';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function MyPage({isOpen}) {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const logOut = () => {
    Swal.fire({
      title: "Anda yakin untuk Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/");
        Swal.fire({
          title: "Keluar Berhasil",
          icon: "success",
        });
      }
    });
  }
  return (
    <div>
    <Sidebar aria-label="Default sidebar example" className={`overflow-y-auto fixed top-0 ${isOpen ? 'block' : 'w-0 hidden'}`}>
      <Sidebar.Items className='w-46'>
        <div className='flex flex-col items-center justify-center'>
          <img src={img} className='h-32' alt="" />
          <h1 className='text-sm font-bold'>Dinas Pemuda dan Olahraga</h1>
          <h2 className='text-sm font-semibold'>Provinsi <br /> Kalimantan Timur</h2>
        </div>
        <Sidebar.ItemGroup className='text-left'>
          <Sidebar.Item href="#" icon={HiHome}>
            <Link to="/">Dashboard</Link>           
          </Sidebar.Item>
          <Sidebar.Collapse className='' icon={HiChartPie} label="Surat">
            <Sidebar.Item><Link to="/surat-masuk">Surat Masuk</Link></Sidebar.Item>
            <Sidebar.Item><Link to="/surat-keluar">Surat Keluar</Link></Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item icon={HiInbox}><Link to="/upload">Input</Link></Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            <Link to='/user'>
              Users
            </Link>
          </Sidebar.Item>
          {isLoggedIn?(
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              <div onClick={logOut} className='text-red-500 font-bold'>
                Keluar
              </div>
            </Sidebar.Item>
          ):(
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              <Link to='/login' className='text-green-500 font-bold'>
                Masuk
              </Link>
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}
MyPage.propTypes = {
  isOpen: PropTypes.bool.isRequired
};