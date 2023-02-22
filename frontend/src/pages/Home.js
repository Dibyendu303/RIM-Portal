import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/Filter.jsx'


const Home = () => {
    const [user, setUser] = useState(null);
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