import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/Filter.jsx'

const Home = () => {
    const [data, setData] = useState([]);
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
    useEffect(() => {
        fetchData();
    }, [])
    const [user, setUser] = useState(true);
    const navigate = useNavigate();
    if (!user) {
        console.log("User not found");
        navigate('/login');
    }
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