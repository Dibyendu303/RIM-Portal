import React from 'react'
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/filter.jsx'


const Main = () => {
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

export default Main