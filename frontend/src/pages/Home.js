import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/Filter.jsx'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = (props) => {
    const [data, setData] = useState([]);
    const { user, setUser } = props;
    const [openErrorMsg, setOpenErrorMsg] = useState(false);
    const [openNetworkErrorMsg, setOpenNetworkErrorMsg] = useState(false);

    const handleClickErrorMsg = () => {
        setOpenErrorMsg(true);
    };

    const handleCloseErrorMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorMsg(false);
    };

    const handleClickNetworkErrorMsg = () => {
        setOpenNetworkErrorMsg(true);
    };

    const handleCloseNetworkErrorMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNetworkErrorMsg(false);
    };

    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const fetchResponse = await fetch(`http://localhost:8080/item`);
            const data = await fetchResponse.json();
            setData(data);
            // console.log(data);
        }
        catch (e) {
            handleClickNetworkErrorMsg();
            // alert("Internal server error. Please try again later");
        }
    }

    const validateToken = async (token) => {
        try {
            const credentials = { jwt: token };
            axios.post("http://localhost:4000/checkToken", credentials)
                .then((res) => {
                    setUser(res.data.user);
                }).catch((e) => {
                    handleClickErrorMsg();
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                });
        }
        catch (e) {
            navigate('/login');
            // console.log("Home.js - Network error in validate token");
            handleClickNetworkErrorMsg();
            // alert('Internal server error. Please try again later.');
        }
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('rim-jwt'));
        if (token) {
            validateToken(token);
        }
        fetchData();
    }, []);
    const vertical = 'top'
    const horizontal = 'center';

    return (
        <div className="bg-[#011018]">
            <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleCloseErrorMsg} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseErrorMsg} severity="error" sx={{ width: '100%' }}>
                    Session expired. Please login again!
                </Alert>
            </Snackbar>
            <Snackbar open={openNetworkErrorMsg} autoHideDuration={6000} onClose={handleCloseNetworkErrorMsg} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseNetworkErrorMsg} severity="error" sx={{ width: '100%' }}>
                    Network error. Please try again later!
                </Alert>
            </Snackbar>
            <Navbar data={data} setData={setData} />
            <div className='min-h-screen flex flex-row gap-4 p-4'>
                <Filter></Filter>
                <EnhancedTable data={data} setData={setData} user={user}></EnhancedTable>
            </div>
        </div>
    )
}

export default Home