import React from 'react'
import Navbar from '../components/Navbar';
import Filter from '../components/filter/Filter.jsx'
import RequestReceived from '../components/RequestReceived';


const Received = () => {
    return (
        <div className="bg-[#011018]">
            <Navbar />
            <div className='min-h-screen flex flex-row gap-4 p-4'>
                <Filter></Filter>
                <RequestReceived></RequestReceived>
            </div>
        </div>
    )
}

export default Received