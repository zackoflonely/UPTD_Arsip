import response from './response.mjs';
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arsip_uptd'
});


const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

const authDataMap = new Map();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });

//api untuk insert
server.post('/api/insert', upload.single('File'), (req, res) => {
  db.connect(() => {
    const { Token, Klasifikasi, No_Urut, Waktu, Tujuan, Nomor_Surat, Perihal, Kaitan, Keterangan, Jenis} = req.body;
    const File = req.file.filename; 
    const authData = authDataMap.get(Token).userId;
    if(authData){
      const ID_AdminValue = authData; 
      const sqlInsert = `INSERT INTO surat (ID_User, Klasifikasi, No_Urut, Waktu, Tujuan, Nomor_Surat, Perihal, Kaitan, Keterangan, Jenis, File) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [ID_AdminValue, Klasifikasi, No_Urut, Waktu, Tujuan, Nomor_Surat, Perihal, Kaitan, Keterangan, Jenis, File,];
    
      db.query(sqlInsert, values, (err, fields) => {
        if (err) {
          console.error('Error = ',err);
          res.status(500).send('Gagal menyimpan data.');
        } else {
          if (fields.affectedRows) {
            response(200, "INI INSERT", "BERHASIL", res);
          } else {
            console.log("Gagal menyimpan data.");
          }
          console.log(fields);
        }
      });
    }
  })
});


//api untuk update
server.put('/api/update/:ID_Surat', (req, res) => {
  const ID_Surat = req.params.ID_Surat;
  db.connect(() => {
    const { Token, Klasifikasi, No_Urut, Waktu, Tujuan, Nomor_Surat, Perihal, Kaitan, Keterangan} = req.body;
    const authData = authDataMap.get(Token).userId;
    if(authData){
      const sqlInsert = `UPDATE surat set Klasifikasi = ?, No_Urut = ?, Waktu = ?, Tujuan = ?, Nomor_Surat = ?, Perihal = ?, Kaitan = ?, Keterangan = ?  WHERE ID_Surat = ?`;
      const values = [Klasifikasi, No_Urut, Waktu, Tujuan, Nomor_Surat, Perihal, Kaitan, Keterangan, ID_Surat];
      db.query(sqlInsert, values, (err, fields) => {
        if (err) {
          console.error('Error = ',err);
          res.status(500).send('Gagal menyimpan data.');
        } else {
          if (fields.affectedRows) {
            response(200, "INI INSERT", "BERHASIL", res);
          } else {
            console.log("Gagal menyimpan data.");
          }
          console.log(fields);
        }
      });
    }
  })
});

//api menampilkan data surat
server.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM surat ORDER BY No_Urut ASC";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

//api menampilkan data surat masuk
server.get('/api/suratMasuk/:tahun', (req, res) => {
  const Tahun = req.params.tahun;
  const sqlSelect = "SELECT * FROM surat WHERE Jenis = 'Surat Masuk' AND YEAR(Waktu) = ?";
  db.query(sqlSelect, [Tahun], (err, result) => {
      res.send(result);
  });
});

//api menampilkan data surat keluar
server.get('/api/suratKeluar/:tahun', (req, res) => {
  const Tahun = req.params.tahun;
  const sqlSelect = "SELECT * FROM surat WHERE Jenis = 'Surat Keluar' AND YEAR(Waktu) = ?";
  db.query(sqlSelect, [Tahun], (err, result) => {
      res.send(result);
  });
});

//api menampilkan data tahun surat
server.get('/api/tahun', (req, res) => {
  const sqlSelect = "SELECT DISTINCT YEAR(Waktu) AS Tahun FROM surat";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api menghpaus surat
server.delete('/api/delete/:ID_Surat', (req, res) => {
  const ID_Surat = req.params.ID_Surat;
  db.connect(() => {
    const sqlSelect = "DELETE FROM surat WHERE ID_Surat = ?";
    const value = [ID_Surat]
    db.query(sqlSelect, value, (err, result) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).send('Gagal menghapus data.');
      }
      if (result.affectedRows) {
        res.status(200).send('Data berhasil dihapus');
      } else {
        res.status(404).send('Data tidak ditemukan');
      }
    });
  })
});

//api klasifikasi surat
server.get('/api/klasifikasi', (req, res) => {
  const sqlSelect = "SELECT * FROM klasifikasi";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api untuk insert klasifikasi
server.post('/api/insert/klasifikasi', upload.none(), (req, res) => {
  db.connect(() => {
    const { Klasifikasi, Keterangan} = req.body;
    const sqlInsert = `INSERT INTO klasifikasi (ID_Klasifikasi, Keterangan) VALUES (?, ?)`;
    const values = [Klasifikasi, Keterangan];

    db.query(sqlInsert, values, (err, fields) => {
      if (err) {
        console.error('Error = ',err);
        res.status(500).send('Gagal menyimpan data.');
      } else {
        if (fields.affectedRows) {
          response(200, "INI INSERT", "BERHASIL", res);
        } else {
          console.log("Gagal menyimpan data.");
        }
        console.log(fields);
      }
    });
  })
});

//api untuk update klasifikasi
server.put('/api/update/klasfikasi/:ID_Klasifikasi', (req, res) => {
  const ID_Klasifikasi = req.params.ID_Klasifikasi;
  db.connect(() => {
    const { Klasifikasi, Keterangan} = req.body;
    const sqlInsert = `UPDATE klasifikasi set ID_Klasifikasi = ?, Keterangan = ?  WHERE ID_Klasifikasi = ?`;
    const values = [Klasifikasi, Keterangan, ID_Klasifikasi];
    db.query(sqlInsert, values, (err, fields) => {
      if (err) {
        console.error('Error = ',err);
        res.status(500).send('Gagal menyimpan data.');
      } else {
        if (fields.affectedRows) {
          response(200, "INI INSERT", "BERHASIL", res);
        } else {
          console.log("Gagal menyimpan data.");
        }
        console.log(fields);
      }
    });
  })
});

//api menghapus klasifikasi
server.delete('/api/delete/klasifikasi/:ID_Klasifikasi', (req, res) => {
  const ID_Klasifikasi = req.params.ID_Klasifikasi;
  db.connect(() => {
    const sqlSelect = "DELETE FROM klasifikasi WHERE ID_Klasifikasi = ?";
    const value = [ID_Klasifikasi]
    db.query(sqlSelect, value, (err, result) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).send('Gagal menghapus data.');
      }
      if (result.affectedRows) {
        res.status(200).send('Data berhasil dihapus');
      } else {
        res.status(404).send('Data tidak ditemukan');
      }
    });
  })
});

//api hitung surat tahun sekarang
server.get('/api/surat/year', (req, res) => {
  const sqlSelect = "SELECT COUNT(*) AS jumlah_surat FROM surat WHERE YEAR(Waktu) = YEAR(CURDATE())";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api hitung jumlah klasifikasi
server.get('/api/surat/klasifikasi', (req, res) => {
  const sqlSelect = "SELECT COUNT(*) AS jumlah_klasifikasi FROM klasifikasi";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api hitung surat minggu sekarang
server.get('/api/surat/week', (req, res) => {
  const sqlSelect = "SELECT COUNT(*) AS jumlah_surat FROM surat WHERE Waktu BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 WEEK) AND CURDATE()";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api hitung surat total
server.get('/api/surat/total', (req, res) => {
  const sqlSelect = "SELECT COUNT(*) AS jumlah_surat FROM surat";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api surat masuk dan keluar
server.get('/api/surat/all', (req, res) => {
  const sqlSelect = "SELECT SUM(CASE WHEN jenis = 'Surat Masuk' THEN 1 ELSE 0 END) AS jumlah_surat_masuk, SUM(CASE WHEN jenis = 'Surat Keluar' THEN 1 ELSE 0 END) AS jumlah_surat_keluar FROM surat";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api surat masuk dan keluar
server.get('/api/surat/5week', (req, res) => {
  const sqlSelect = `SELECT COUNT(CASE WHEN YEAR(Waktu) = YEAR(CURDATE()) AND WEEK(Waktu) = WEEK(CURDATE() - INTERVAL 4 WEEK) THEN 1 END) AS 'Minggu_5', COUNT(CASE WHEN YEAR(Waktu) = YEAR(CURDATE()) 
                    AND WEEK(Waktu) = WEEK(CURDATE() - INTERVAL 3 WEEK) THEN 1 END) AS 'Minggu_4', COUNT(CASE WHEN YEAR(Waktu) = YEAR(CURDATE()) AND WEEK(Waktu) = WEEK(CURDATE() - INTERVAL 2 WEEK) THEN 1 END) AS 'Minggu_3', COUNT(CASE WHEN YEAR(Waktu) = YEAR(CURDATE()) AND WEEK(Waktu) = WEEK(CURDATE() - INTERVAL 1 WEEK) 
                    THEN 1 END) AS 'Minggu_2', COUNT(CASE WHEN YEAR(Waktu) = YEAR(CURDATE()) AND WEEK(Waktu) = WEEK(CURDATE()) THEN 1 END) AS 'Minggu_1' FROM surat`;
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api surat 12 bulan
server.get('/api/surat/month', (req, res) => {
  const sqlSelect = `SELECT 
    COUNT(CASE WHEN MONTH(Waktu) = 1 THEN 1 END) AS bulan1,
    COUNT(CASE WHEN MONTH(Waktu) = 2 THEN 1 END) AS bulan2,
    COUNT(CASE WHEN MONTH(Waktu) = 3 THEN 1 END) AS bulan3,
    COUNT(CASE WHEN MONTH(Waktu) = 4 THEN 1 END) AS bulan4,
    COUNT(CASE WHEN MONTH(Waktu) = 5 THEN 1 END) AS bulan5,
    COUNT(CASE WHEN MONTH(Waktu) = 6 THEN 1 END) AS bulan6,
    COUNT(CASE WHEN MONTH(Waktu) = 7 THEN 1 END) AS bulan7,
    COUNT(CASE WHEN MONTH(Waktu) = 8 THEN 1 END) AS bulan8,
    COUNT(CASE WHEN MONTH(Waktu) = 9 THEN 1 END) AS bulan9,
    COUNT(CASE WHEN MONTH(Waktu) = 10 THEN 1 END) AS bulan10,
    COUNT(CASE WHEN MONTH(Waktu) = 11 THEN 1 END) AS bulan11,
    COUNT(CASE WHEN MONTH(Waktu) = 12 THEN 1 END) AS bulan12
    FROM
      surat
    WHERE 
      YEAR(Waktu) = YEAR(CURDATE())`;
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

//api login
server.get('/api/getAcc', (req, res) => {
  const sqlSelect = "SELECT * FROM user";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  });
});

server.post('/api/auth', (req, res) => {
  const { userId, userToken } = req.body;
  authDataMap.set(userToken,{ userId, userToken });
  const responseData = {
    status: 'success',
    message: 'Autentikasi berhasil!',
    userId: userId,
    userToken:userToken
  };
  res.json(responseData);
});

//api login with encrypt
// server.post('/api/getAcc', (req, res) => {
//   const { username, password } = req.body;
//   const sqlSelect = "SELECT * FROM user WHERE Username = ?";
//   db.query(sqlSelect, [username], async (err, result) => {
//     if (err) {
//       console.error('Server error:', err);
//       res.status(500).send('Server error');
//       return;
//     }

//     if (result.length > 0) {
//       const user = result[0];
//       // Memeriksa kecocokan password
//       try {
//         const match = await bcrypt.compare(password, user.Password);

//         if (match) {
//           // Password cocok, buat token JWT
//           const token = jwt.sign({ email: user.Email }, 'uptddisporaprovkaltim2024', { expiresIn: '1h' });
//           res.json({ token });
//         } else {
//           // Password tidak cocok
//           res.status(401).json({ message: 'Invalid email or password' });
//         }
//       } catch (error) {
//         console.error('Error comparing passwords:', error);
//         res.status(500).send('Server error');
//       }
//     } else {
//       // User tidak ditemukan
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   });
// });

//api detail surat
server.get('/api/detail_surat/:ID_Surat', (req, res) => {
  const { ID_Surat} = req.params;
  const sqlSelect = "SELECT * FROM surat WHERE ID_Surat = ?";
  const values = [ID_Surat];
  db.query(sqlSelect, values, (err, result) => {
      res.send(result);
  });
});

//api detail klasifikasi
server.get('/api/detail_klasifikasi/:ID_Klasifikasi', (req, res) => {
  const { ID_Klasifikasi} = req.params;
  const sqlSelect = "SELECT * FROM klasifikasi WHERE ID_Klasifikasi = ?";
  const values = [ID_Klasifikasi];
  db.query(sqlSelect, values, (err, result) => {
      res.send(result);
  });
});

//search surat
server.get('/api/search/surat', (req, res) => {
  const searchKeyword = req.query.keyword;
  if (!searchKeyword) {
      return res.status(400).send({ error: 'Keyword is required' });
  }
  const sqlSelect = "SELECT * FROM surat WHERE Perihal REGEXP ? OR Nomor_Surat REGEXP ? OR Tujuan REGEXP ?";
  db.query(sqlSelect, [searchKeyword, searchKeyword, searchKeyword], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send(result);
  });
});

//api register akun
server.post('/api/register', async (req, res) => {
  const { email, password, nama } = req.body;

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sqlInsert = 'INSERT INTO user (Email, Password, name_Author) VALUES (?, ?, ?)';
  const values = [email, hashedPassword, nama];

  db.query(sqlInsert, values, (err) => {
    if (err) {
      console.error('Error = ', err);
      res.status(500).send('Data Invalid.');
    } else {
      res.status(201).json({ message: 'Registrasi berhasil' });
    }
  });
});


db.connect((err) => {
    if (err) throw err;
    console.log("Sukses terhubung");
    server.get("/", (req, res) => {
        res.send("DISPORA KALTIM API ARSIP!");
    });
});

server.listen(8000, () => {
    console.log("Started");
});