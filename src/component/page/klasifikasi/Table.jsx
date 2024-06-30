'use client';
import { Button, Table } from 'flowbite-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function TableData({getKonten}) {
  const handleRemove = async(ID_Klasifikasi)=>{
    try {
      const confirmation = await Swal.fire({
        title: "Konfirmasi Hapus?",
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        confirmButtonText:'Ya Hapus',
        icon: "warning"
      });
      if(confirmation.isConfirmed){
        const response = await Axios.delete(`http://localhost:8000/api/delete/klasifikasi/${ID_Klasifikasi}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Berhasil",
            text: "Klasifikasi berhasil dihapus",
            icon: "success"
          }).then(()=>{
            window.location.reload();
          })
        } 
        else {
            const errorMessage = await response.text();
            Swal.fire({
              title: "Gagal",
              text: `Gagal Menghapus Klasifikasi ${errorMessage}`,
              icon: "error"
            })
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan.Error:", error);
    }
  }
  return (
    <div className="overflow-x-auto my-3 w-full">
      <Link to='/upload/klasifikasi'>
          <Button color="light" className="my-2 bg-white border-lg-black text-black hover:font-bold font-base"><FontAwesomeIcon style={{ fontSize: '0.8em', marginRight:'3px' }} icon={faPlus} />Klasifikasi</Button>
      </Link>
      <Table hoverable className='border border-md'>
        <Table.Head className='text-center border-b-2 border-black'>
          <Table.HeadCell>Klasifikasi</Table.HeadCell>
          <Table.HeadCell className='px-32'>Keterangan</Table.HeadCell>
          <Table.HeadCell colSpan={2}>Aksi</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {getKonten.map((item,idx)=>(
            <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className='text-center'>{item.ID_Klasifikasi}</Table.Cell>
              <Table.Cell className='text-center'>{item.Keterangan}</Table.Cell>
              <Table.Cell>
                <Link to={`/edit/klasifikasi/${item.ID_Klasifikasi}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link onClick={()=>handleRemove(item.ID_Klasifikasi)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                  Remove
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
TableData.propTypes = {
  getKonten: PropTypes.arrayOf(PropTypes.object).isRequired
};