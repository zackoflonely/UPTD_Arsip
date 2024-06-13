'use client';
import { Table } from 'flowbite-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export default function TableData({getKonten}) {
  const handleRemove = async(ID_Surat)=>{
    try {
      const response = await Axios.delete(`http://localhost:8000/api/delete/${ID_Surat}`);
      if (response.status === 200) {
        await Swal.fire({
          title: "Konfirmasi Hapus?",
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          confirmButtonText:'Ya Hapus',
          icon: "warning"
        }).then(() => {
          Swal.fire({
            title: "Berhasil",
            text: "Surat berhasil dihapus",
            icon: "success"
          }).then(()=>{
            window.location.reload();
          })
        });
      } 
      else {
          const errorMessage = await response.text();
          Swal.fire({
            title: "Gagal",
            text: `Gagal Menghapus Surat ${errorMessage}`,
            icon: "error"
          })
      }
    } catch (error) {
      console.error("Terjadi kesalahan.Error:", error);
    }
  }
  return (
    <div className="overflow-x-auto my-3 w-full">
      <Table hoverable>
        <Table.Head className='text-center'>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Klasifikasi</Table.HeadCell>
          <Table.HeadCell className='px-12'>Tanggal Keluar</Table.HeadCell>
          <Table.HeadCell className='px-32'>Tujuan</Table.HeadCell>
          <Table.HeadCell>Nomor Surat</Table.HeadCell>
          <Table.HeadCell className='px-32'>Perihal</Table.HeadCell>
          <Table.HeadCell>Kaitan</Table.HeadCell>
          <Table.HeadCell className='px-32'>Keterangan</Table.HeadCell>
          <Table.HeadCell colSpan={3}>Aksi</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {getKonten.map((item,idx)=>(
            <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.No_Urut}
              </Table.Cell>
              <Table.Cell>{item.Klasifikasi}</Table.Cell>
              <Table.Cell className='text-center'>{new Date(item.Waktu).toLocaleDateString('id-ID')}</Table.Cell>
              <Table.Cell>{item.Tujuan}</Table.Cell>
              <Table.Cell>{item.Nomor_Surat}</Table.Cell>
              <Table.Cell>{item.Perihal}</Table.Cell>
              <Table.Cell>{item.Kaitan}</Table.Cell>
              <Table.Cell>{item.Keterangan}</Table.Cell>
              <Table.Cell>
                <Link to={`/edit/${item.ID_Surat}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link onClick={()=>handleRemove(item.ID_Surat)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                  Remove
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link to={`/surat/${item.ID_Surat}`} className="font-medium text-green-600 hover:underline dark:text-red-500">
                  See
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