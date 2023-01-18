import React from 'react'
import background from "../images/login_background.jpg";
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import "./Login.css"

import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { paper } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: 'rgba(255, 255, 255, 0.6)',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        text: {
            primary: "rgba(255, 255, 255, 1)"
        }
    },
});


const Login = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='login-container h-full w-screen' style={{ backgroundImage: `url(${background})` }} >
                    <div className='bg-[#07689F] min-h-screen h-full w-full md:w-6/12 l:w-5/12 px-12 py-16'>
                        <h1 className='text-[4.5rem] font-bold text-white max-w-md mx-auto md:mx-0'>
                            RIM
                        </h1>
                        <h1 className='text-[4.5rem] font-bold text-white max-w-md mx-auto md:mx-0'>
                            Portal
                        </h1>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className='flex flex-col px-2 gap-6 py-12 max-w-md mx-auto md:mx-0'
                        >
                            <TextField id="standard-basic" label="Enter email" variant="standard" InputLabelProps={{
                                style: {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                }
                            }} />
                            <TextField id="standard-basic" label="Password" variant="standard" type="password" InputLabelProps={{
                                style: {
                                    color: 'rgba(255, 255, 255, 0.6)'
                                }
                            }} />
                            <div className='flex justify-between items-center'>
                                <span className='text-white/80 hover:underline cursor-pointer'>Forgot Password?</span>
                                <Button
                                    style={{
                                        backgroundColor: "#033B5A",
                                        color: "white",
                                        padding: "0.5rem 2rem",
                                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                    }}
                                    className='shadow-lg'
                                    variant="contained"
                                >
                                    Login
                                </Button>
                            </div>
                        </Box>
                        <div className=' flex items-center justify-between mt-4 max-w-sm mx-auto'>
                            <div className='bg-white rounded-full w-20 h-20 shadow-2xl shadow-black/60 grid place-items-center'>Logo</div>
                            <div className='bg-white rounded-full w-20 h-20 shadow-2xl shadow-black/60 grid place-items-center'>Logo</div>
                            <div className='bg-white rounded-full w-20 h-20 shadow-2xl shadow-black/60 grid place-items-center'>Logo</div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default Login