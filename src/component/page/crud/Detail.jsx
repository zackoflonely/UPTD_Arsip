import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

function Detail(){
    const { id } = useParams();
    const [getKonten,setKonten]= useState([]);
    const getDetail = async () => {
        const response = await Axios.get(`http://localhost:8000/api/detail_surat/${id}`);
        setKonten(response.data);
      };
    useEffect(()=>{
        getDetail();
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <div className="p-5">
        <h1 className="w-full my-3 text-left text-3xl font-semibold font-mono">
            <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faMailBulk}/> Detail Surat
        </h1>
        {getKonten.map((item,idx)=>(
        <div className="flex justify-evenly items-start gap-4" key={idx}>
            <div className="border border-md w-2/4">
                <table cellPadding={15} className="text-left">
                    <tr>
                        <td>No Urut</td>
                        <td className="px-5">:</td>
                        <td>{item.No_Urut}</td>
                    </tr>
                    <tr>
                        <td>Klasifikasi</td>
                        <td className="px-5">:</td>
                        <td>{item.Klasifikasi}</td>
                    </tr>
                    <tr>
                        <td>Waktu</td>
                        <td className="px-5">:</td>
                        <td>{item.Waktu}</td>
                    </tr>
                    <tr>
                        <td>Tujuan</td>
                        <td className="px-5">:</td>
                        <td>{item.Tujuan}</td>
                    </tr>
                    <tr>
                        <td>Nomor Surat</td> 
                        <td className="px-5">:</td>
                        <td>{item.Nomor_Surat}</td>
                    </tr>
                    <tr>
                        <td>Perihal</td>
                        <td className="px-5">:</td>
                        <td>{item.Perihal}</td>
                    </tr>
                    <tr>
                        <td>Kaitan</td>
                        <td className="px-5">:</td>
                        <td>{item.Kaitan}</td>
                    </tr>
                    <tr>
                        <td>Keterangan</td>
                        <td className="px-5">:</td>
                        <td>{item.Keterangan}</td>
                    </tr>
                    <tr>
                        <td>Jenis</td>
                        <td className="px-5">:</td>
                        <td>{item.Jenis}</td>
                    </tr>
                </table>
            </div>
            <div className="border border-md w-2/4">
                <iframe src={`/upload/${item.File}`} width="100%" height="600px">
                    This browser does not support PDFs. Please download the PDF to view it: <a href="path/to/your/file.pdf">Download PDF</a>
                </iframe>
            </div>
        </div>
        ))}
        </div>
    )
}

export default Detail;