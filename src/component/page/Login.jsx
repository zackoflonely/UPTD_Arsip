import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import image from '../../assets/logo-dispora.png';
import { useEffect, useState } from "react";
import Axios from 'axios';
import Swal from 'sweetalert2';
import CryptoJS from "crypto-js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login(){
    useEffect(()=>{
        getAcc();
        window.scrollTo(0, 0);
    },[]);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const secretKey = 'UPTDDISPORAPROVKALTIM'
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Acc,setAcc]= useState([]);
    const getAcc = async () => {
        const response = await Axios.get("http://localhost:8000/api/getAcc");
        setAcc(response.data);
      };
    const generateToken = () => {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substring(7);
        const expirationTime = Date.now() + 60 * 60 * 1000;
        const tokenPayload = { timestamp, randomString, expirationTime };
        localStorage.setItem('expiredTime', expirationTime);
        const token = CryptoJS.HmacSHA256(JSON.stringify(tokenPayload), secretKey).toString(CryptoJS.enc.Hex);
      
        return token;
      };
    const handleProcess = async () =>{
        const found = Acc.find(item => item.Username === Username && item.Password === Password);
        const generatedToken = generateToken();
        const Token = generatedToken;
        const ID = found.ID_User;
        const requestData = {
            userId: ID,
            userToken: Token
          };
        fetch('http://localhost:8000/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respon dari server:', data);
        })
        .catch(error => {
            console.error('Gagal melakukan permintaan ke server:', error);
        });
        if(found){
            localStorage.setItem('token', generatedToken)
            localStorage.setItem('ID', found.ID_Admin)
            try {
                await Swal.fire({
                    title: "Berhasil Login",
                    text: "Welcome to Arsip Surat UPTD DISPORA PROV. Kaltim",
                    icon: "success"
                  }).then(() => {
                    window.location.href = '/';
                  });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Gagal Login",
                    text: "Terjadi kesalahan saat mencoba login.",
                    icon: "error"
                });
            }
        }
    }
    return(
    <div id='/' className="w-full h-auto">
        <div className="flex justify-start m-5">
            <LazyLoadImage loading="lazy" className="w-16 h-auto" src={image} alt="" />
            <div className="flex flex-col justify-center text-left mx-3">
                <h2 className="text-2xl font-bold">UPTD PPO</h2>
                <h3 className="text-xl font-base">DISPORA PROV. KALTIM</h3>
            </div>
        </div>
        <div className="flex bg-login items-center justify-center lg:justify-end">
            <div className='p-12'>
                <div className="flex justify-center">
                    <LazyLoadImage loading="lazy" className="w-24" src={image} alt="" />
                </div>
                <h1 className='text-4xl my-2 text-center font-semibold font-serif text-black'>Welcome Back to Arsip</h1>
                <form onSubmit={handleProcess} className="text-white">
                    <TextField
                        className="text-black"
                        label="Username"
                        sx={{
                            '& label': {
                                color: 'black',
                            },
                            '& label.Mui-focused': {
                                color: 'black',
                            },
                            '& .MuiInputBase-input':{
                                color:'black'
                            }
                            }}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value) }
                        margin="normal"
                    />
                    <TextField
                        className="text-black"
                        label="Password"
                        sx={{
                            '& label': {
                                color: 'black',
                            },
                            '& label.Mui-focused': {
                                color: 'black',
                            },
                            '& .MuiInputBase-input':{
                                color:'black'
                            }
                            }}
                        fullWidth
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button onClick={handleProcess} type="button" variant="contained" color="success" className="mt-2 w-full">
                        Login
                    </Button>
                </form>
            </div> 
        </div>
    </div>
    )
}

export default Login;