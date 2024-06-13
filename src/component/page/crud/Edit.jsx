import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Edit() {
  const [Klasifikasi, setKlasifikasi] = useState("");
  const [Urutan, setUrutan] = useState("");
  const [waktuUpload, setWaktuUpload] = useState(new Date());
  const [Tujuan, setTujuan] = useState("");
  const [NomorSurat, setNomorSurat] = useState("");
  const [Perihal, setPerihal] = useState("");
  const [Kaitan, setKaitan] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [jenis, setJenis] = useState("");
  const [File, setFile] = useState(null);
  const Token = localStorage.getItem('token');

  useEffect(() => {
    getKlasifikasi();
    getSurat();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const { id } = useParams();
  const getSurat = async () => {
      const response = await Axios.get(`http://localhost:8000/api/detail_surat/${id}`);
      setKlasifikasi(response.data[0].Klasifikasi);
      setUrutan(response.data[0].No_Urut);
      setTujuan(response.data[0].Tujuan);
      setPerihal(response.data[0].Perihal);
      setNomorSurat(response.data[0].Nomor_Surat);
      setKaitan(response.data[0].Kaitan);
      setKeterangan(response.data[0].Keterangan);
      setJenis(response.data[0].Jenis);
      setWaktuUpload(new Date(response.data[0].Waktu));
      setFile(response.data[0].File);
    };
  const [getKonten,setKonten]= useState([]);
  const getKlasifikasi = async () => {
      const response = await Axios.get("http://localhost:8000/api/klasifikasi");
      setKonten(response.data);
    };
  const handleUpdate = async () => {
     try {
      const response = await Axios.put(`http://localhost:8000/api/update/${id}`,{
        Klasifikasi:Klasifikasi,
        No_Urut: Urutan,
        Waktu:waktuUpload.toISOString().substring(0, 10),
        Tujuan:Tujuan,
        Nomor_Surat:NomorSurat,
        Perihal:Perihal,
        Kaitan:Kaitan,
        Keterangan:Keterangan,
        File:File,
        Token:Token
      })
      if (response.status === 200) {
          await Swal.fire({
            title: "Berhasil",
            text: "Surat berhasil diupdate",
            icon: "success"
          }).then(() => {
            window.location.href = '/';
          });
        } 
        else {
            const errorMessage = await response.text();
            alert(`Gagal mengupdate. Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Terjadi kesalahan.Error:", error);
    }
  };

  return (
    <div className="my-5 text-left w-full">
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Arsip Surat
      </Typography>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-2 gap-4 mb-12">
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Klasifikasi</InputLabel>
            <Select
              label="Klasifikasi"
              value={Klasifikasi}
              onChange={(e) => setKlasifikasi(e.target.value)}
            >
              {getKonten.map((item,idx)=>(
                <MenuItem key={idx} value={item.ID_Klasifikasi}>{item.ID_Klasifikasi}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Nomor Urut"
            fullWidth
            variant="outlined"
            value={Urutan}
            onChange={(e) => setUrutan(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Tanggal Surat Keluar"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={waktuUpload.toISOString().substring(0,10)}
            onChange={(e) => setWaktuUpload(new Date(e.target.value))}
            margin="normal"
          />

          <TextField
            label="Tujuan"
            fullWidth
            variant="outlined"
            value={Tujuan}
            onChange={(e) => setTujuan(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Nomor Surat"
            fullWidth
            variant="outlined"
            value={NomorSurat}
            onChange={(e) => setNomorSurat(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Perihal"
            fullWidth
            variant="outlined"
            value={Perihal}
            onChange={(e) => setPerihal(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Terkait Surat"
            fullWidth
            variant="outlined"
            value={Kaitan}
            onChange={(e) => setKaitan(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Keterangan"
            fullWidth
            variant="outlined"
            value={Keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Jenis Surat</InputLabel>
            <Select
              label="Jenis Surat"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
            >
              <MenuItem value="Surat Masuk">Surat Masuk</MenuItem>
              <MenuItem value="Surat Keluar">Surat Keluar</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button onClick={handleUpdate} type="button" variant="contained" className="w-full" color="primary">
          Upload
        </Button>
      </form>
    </Container>
    </div>
  );
}

export default Edit;
