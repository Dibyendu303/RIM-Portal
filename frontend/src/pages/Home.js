import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/Filter.jsx'
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const fetchResponse = await fetch(`http://localhost:8080/item`);
            const data = await fetchResponse.json();
            setData(data);
            console.log(data);
        }
        catch (e) {
            alert("Internal server error. Please try again later");
        }
    }

    const validateToken = async (token) => {
        try {
            const credentials = { jwt: token };
            axios.post("http://localhost:4000/checkToken", credentials)
                .then((res) => {
                    setUser(res.data.user);
                    console.log(res.data);
                }).catch((e) => {
                    navigate('/login');
                    alert('Session expired. Please login again');
                });
        }
        catch (e) {
            navigate('/login');
            alert('Internal server error. Please try again later.');
        }
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('rim-jwt'));
        if (token) {
            validateToken(token);
        }
        fetchData();
    }, []);

    return (
        <div className="bg-[#011018]">
            <Navbar data={data} setData={setData} />
            <div className='min-h-screen flex flex-row gap-4 p-4'>
                <Filter></Filter>
                <EnhancedTable data={data}></EnhancedTable>
            </div>
        </div>
    )
}

export default Home