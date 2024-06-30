import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import Axios from 'axios';
import { useParams } from "react-router-dom";

function Edit() {
  const [Klasifikasi, setKlasifikasi] = useState("");
  const [Keterangan, setKeterangan] = useState("");

  useEffect(() => {
    getKlasifikasi();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const { id } = useParams();
  const getKlasifikasi = async () => {
    const response = await Axios.get(`http://localhost:8000/api/detail_klasifikasi/${id}`);
    setKlasifikasi(response.data[0].ID_Klasifikasi);
    setKeterangan(response.data[0].Keterangan);
  };
  const handleUpdate = async () => {
     try {
      const response = await Axios.put(`http://localhost:8000/api/update/klasfikasi/${id}`,{
        Klasifikasi:Klasifikasi,
        Keterangan:Keterangan,
      })
      if (response.status === 200) {
          await Swal.fire({
            title: "Berhasil",
            text: "Klasifikasi berhasil diupdate",
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
          <TextField
            label="Klasifikasi Surat"
            fullWidth
            variant="outlined"
            value={Klasifikasi}
            onChange={(e) => setKlasifikasi(e.target.value)}
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
        </div>

        <Button onClick={handleUpdate} type="button" variant="contained" className="w-full" color="primary">
          Edit
        </Button>
      </form>
    </Container>
    </div>
  );
}

export default Edit;
