import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableData from "../Table";
import { faMailBulk, faPenClip, faPencilAlt, faPencilRuler, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import Axios from 'axios';
import img1 from '../../assets/img1.png';
import image4 from '../../assets/image4.png';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register();
function Inventaris(){
    useEffect(() => {
        getSuratYear();
        getSuratWeek();
        getSuratTotal();
        getSurat();
        getSuratAll();
        getSurat5week();
        getSuratmonth();
        window.scrollTo(0, 0);
    }, []); 
      const [getKonten,setKonten]= useState([]);
      const getSurat = async () => {
          const response = await Axios.get("http://localhost:8000/api/get");
          setKonten(response.data);
        };
    const [getYear,setYear]= useState([]);
    const getSuratYear = async () => {
        const response = await Axios.get("http://localhost:8000/api/surat/year");
        setYear(response.data);
        };
    const [getWeek,setWeek]= useState([]);
    const getSuratWeek = async () => {
        const response = await Axios.get("http://localhost:8000/api/surat/week");
        setWeek(response.data);
        };
    const [getTotal,setTotal]= useState([]);
    const getSuratTotal = async () => {
        const response = await Axios.get("http://localhost:8000/api/surat/total");
        setTotal(response.data);
        };
    const [getAll,setAll]= useState([]);
    const getSuratAll = async () => {
        const response = await Axios.get("http://localhost:8000/api/surat/all");
        setAll(response.data);
        };
    const [get5week,set5week]= useState([]);
    const getSurat5week = async () => {
        const response = await Axios.get("http://localhost:8000/api/surat/5week");
        set5week(response.data);
        };
    const [getmonth,setmonth]= useState([]);
    const getSuratmonth = async () => {
        const response = await Axios.get("http://localhost:8000/api/surat/month");
        setmonth(response.data);
        };
    return(
        <div className="flex justify-evenly items-center h-full">
            <div className="w-[68%]">
                <h1 className="w-full my-3 text-left text-3xl font-semibold font-mono">
                    <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faMailBulk}/> Dashboard Surat
                </h1>
                <div className="flex mb-3 w-full justify-between items-center border border-md rounded-md p-5">
                    <div className="text-left">
                        <h1 className="text-4xl font-bold">Welcome to Arsip Surat</h1>
                        <h2 className="text-3xl font-base">UPTD PPO</h2>
                    </div>
                    <img src={img1} className="h-52" alt="" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-left">
                    <div className="flex justify-start items-center border border-md rounded-md p-5">
                        {getWeek.map((item,idx)=>(
                            <div key={idx}>
                                <h2 className="text-md">Surat Arsip Minggu Ini</h2> 
                                <h3 className="text-3xl font-bold">{item.jumlah_surat} <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faPenClip}/></h3>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start items-center border border-md rounded-md p-5">
                        {getYear.map((item,idx)=>(
                            <div key={idx}>
                                <h2 className="text-md">Surat Arsip Tahun 2024</h2> 
                                <h3 className="text-3xl font-bold">{item.jumlah_surat} <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faPencilRuler}/></h3>
                            </div>
                        ))}
                    </div>
                </div>
                <Link to='/upload'>
                    <Button color="light" className="my-2 bg-white border-lg-black text-black hover:font-bold font-base"><FontAwesomeIcon style={{ fontSize: '0.8em', marginRight:'3px' }} icon={faPlus} />Surat</Button>
                </Link>
                <TableData getKonten={getKonten.slice(0,10)}/>
                <div className="grid grid-cols-2 gap-2 text-left">
                    <div className="flex justify-start items-center border border-md rounded-md p-5">
                        {getAll.map((item,idx)=>(
                            <div key={idx}>
                                <h2 className="text-md">Perbandingan</h2> 
                                <Doughnut 
                                    data={{
                                        labels:['Surat Masuk', 'Surat Keluar'],
                                        datasets:[
                                            {
                                                label:'Jumlah',
                                                data:[item.jumlah_surat_masuk, item.jumlah_surat_keluar],
                                                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                                                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                borderWidth: 1,
                                            }
                                        ]
                                    }} 
                                    >
                                </Doughnut>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start items-start border border-md rounded-md p-5">
                        {getmonth.map((item,idx)=>(
                            <div key={idx}>
                                <h2 className="text-md">Arsip Perbulan</h2> 
                                <Line 
                                    data={{
                                        labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", "Jul", "Aug", 'Sept', 'Okt', "Nov", 'Des'],
                                        datasets:[
                                            {
                                                label:'Jumlah Surat',
                                                data:[item.bulan1, item.bulan2, item.bulan3, item.bulan4, item.bulan5, item.bulan6, item.bulan7, item.bulan8, item.bulan9, item.bulan10, item.bulan11, item.bulan12],
                                                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                                                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                                borderWidth: 1,
                                            }
                                        ]
                                    }} 
                                    >
                                </Line>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-auto h-full pt-[60px] ml-3 flex flex-col justify-start">
                <div className="flex h-60 mb-3 justify-center items-center border border-md rounded-md py-5">
                    {getTotal.map((item,idx)=>(
                        <div key={idx}>
                            <h2 className="text-md">Total Surat</h2> 
                            <h3 className="text-3xl font-bold">{item.jumlah_surat} <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faPencilAlt}/></h3>
                        </div>
                    ))}
                </div>
                <div className="flex h-60 mb-3 justify-center items-center border border-md rounded-md py-5">
                    {get5week.map((item,idx)=>(
                        <div key={idx}>
                            <h2 className="text-md">Jumlah Surat 4 Minggu Terakhir</h2> 
                            <Bar 
                                data={{
                                    labels:['3 last week', '2 last week', 'last week', 'this week'],
                                    datasets:[
                                        {
                                            label:'Jumlah',
                                            data:[item.Minggu_4, item.Minggu_3, item.Minggu_2, item.Minggu_1],
                                            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                                            borderWidth: 1,
                                        }
                                    ]
                                }} 
                                >
                            </Bar>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center border border-md rounded-md h-full my-2">
                    <img className="h-full w-auto object-cover" src={image4} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Inventaris;