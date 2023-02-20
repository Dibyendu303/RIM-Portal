import React from 'react'
import Navbar from '../components/Navbar';
import Filter from '../components/filter/Filter.jsx'
import RequestSent from '../components/RequestSent';


const Sent = () => {
    return (
        <div className="bg-[#011018]">
            <Navbar />
            <div className='min-h-screen flex flex-row gap-4 p-4'>
                <Filter></Filter>
                <RequestSent></RequestSent>
            </div>
        </div>
    )
}

export default Sent