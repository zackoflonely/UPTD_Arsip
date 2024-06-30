import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";

function Upload() {
  const [Klasifikasi, setKlasifikasi] = useState("");
  const [Keterangan, setKeterangan] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const handleInsert = async () => {
    const formData = new FormData();
    formData.append("Klasifikasi", Klasifikasi);
    formData.append("Keterangan", Keterangan);

    try {
      const response = await fetch("http://localhost:8000/api/insert/klasifikasi", {
        method: "POST",
        body: formData,
      });
        if (response.ok) {
            await Swal.fire({
              title: "Berhasil",
              text: "Klasifikasi berhasil ditambahkan",
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
        Tambah Klasifikasi
      </Typography>

      <form onSubmit={handleInsert}>
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

        <Button onClick={handleInsert} type="button" variant="contained" className="w-full" color="primary">
          Upload
        </Button>
      </form>
    </Container>
    </div>
  );
}

export default Upload;
