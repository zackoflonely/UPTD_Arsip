'use client';
import { Button, Table } from 'flowbite-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function User() {
    useEffect(() => {
        getAcc();
        window.scrollTo(0, 0);
    }, []); 
      const [getKonten,setKonten]= useState([]);
      const getAcc = async () => {
          const response = await Axios.get("http://localhost:8000/api/getAcc");
          setKonten(response.data);
        };
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
            text: "Akun berhasil dihapus",
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
            text: `Gagal Menghapus Akun ${errorMessage}`,
            icon: "error"
        })
    }
    } catch (error) {
    console.error("Terjadi kesalahan.Error:", error);
    }}
  return (
    <div>
        <h1 className="w-full my-3 text-left text-3xl font-semibold font-mono">
            <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faMailBulk}/> Manage Akun
        </h1>
        <Link to='/upload'>
            <Button color="light" className="my-2 bg-white border-lg-black text-black hover:font-bold font-base"><FontAwesomeIcon style={{ fontSize: '0.8em', marginRight:'3px' }} icon={faPlus} />Akun</Button>
        </Link>
        <div className="overflow-x-auto my-3 w-full">
        <Table hoverable>
            <Table.Head className='text-center'>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Password</Table.HeadCell>
            <Table.HeadCell colSpan={2} className='text-center'>Aksi</Table.HeadCell>
            <Table.HeadCell>
                <span className="sr-only">Edit</span>
            </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            {getKonten.map((item,idx)=>(
                <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                <Table.Cell>{item.Username}</Table.Cell>
                <Table.Cell>{item.Password}</Table.Cell>
                <Table.Cell>
                    <Link to={`/edit/user/${item.ID_User}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link onClick={()=>handleRemove(item.ID_User)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                    Remove
                    </Link>
                </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        </div>
    </div>
  );
}