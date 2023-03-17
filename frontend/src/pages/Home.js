import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/Filter.jsx'


const Home = () => {
    const fetchData = async () => {
        const fetchResponse = await fetch(`http://localhost:8080/item`);
        const data = await fetchResponse.json();
        console.log(data);
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
            <Navbar />
            <div className='min-h-screen flex flex-row gap-4 p-4'>
                <Filter></Filter>
                <EnhancedTable></EnhancedTable>
            </div>
        </div>
    )
}

export default Home