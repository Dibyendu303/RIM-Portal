import React from 'react'
import Navbar from '../components/Navbar';
import EnhancedTable from '../components/EnhancedTable';
import Filter from '../components/filter/Filter.jsx'


const Main = () => {
    return (
        <div style={{ backgroundColor: "#011018", height: "1100px" }}>
            <Navbar />
            <div className='h-screen flex flex-row gap-4 pt-4'>
                <Filter></Filter>
                <EnhancedTable></EnhancedTable>
            </div>

        </div>
    )
}

export default Main