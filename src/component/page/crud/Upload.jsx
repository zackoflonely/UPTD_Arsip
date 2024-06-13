import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import Axios from 'axios';

function Upload() {
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
    window.scrollTo(0, 0);
  }, []); 
  const [getKonten,setKonten]= useState([]);
  const getKlasifikasi = async () => {
      const response = await Axios.get("http://localhost:8000/api/klasifikasi");
      setKonten(response.data);
    };

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      const allowedExtensions = ['pdf', 'PDF'];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Hanya file pdf yang diizinkan.");
        e.target.value = ""; 
      } else {
        setFile(e.target.files[0])
      }
    }
  };
  const handleInsert = async () => {
    console.log(waktuUpload);
    const formData = new FormData();
    formData.append("Token", Token);
    formData.append("Klasifikasi", Klasifikasi);
    formData.append("No_Urut", Urutan);
    formData.append("Waktu", waktuUpload.toISOString().substring(0, 10));
    formData.append("Tujuan", Tujuan);
    formData.append("Nomor_Surat", NomorSurat);
    formData.append("Perihal", Perihal);
    formData.append("Kaitan", Kaitan);
    formData.append("Keterangan", Keterangan);
    formData.append("Jenis", jenis);
    formData.append("File", File);

    try {
      const response = await fetch("http://localhost:8000/api/insert", {
        method: "POST",
        body: formData,
      });
        if (response.ok) {
            await Swal.fire({
              title: "Berhasil",
              text: "Surat berhasil ditambahkan",
              icon: "success"
            }).then(() => {
              window.location.href = '/';
            });
        } 
        else {
            const errorMessage = await response.text();
            alert(`Gagal mengunggah artikel. Error: ${errorMessage}`);
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

      <form onSubmit={handleInsert}>
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
            value={waktuUpload.toISOString().substring(0, 10)}
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

          <TextField
            label="File PDF"
            type="file"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => handleUpload(e)}
            margin="normal"
          />
        </div>

        <Button onClick={handleInsert} type="button" variant="contained" className="w-full" color="primary">
          Upload
        </Button>
      </form>
    </Container>
    </div>
  );
}

export default Upload;
