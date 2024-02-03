import React from 'react'

const DropDown = ({filter, setFilter}) => {
    return (
        <>
         <div className='relative inline-block w-72'>
                <select
                id="filter"
                    className="peer w-fit rounded-md border border-gray-300 bg-white px-3 py-2 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                <label
                htmlFor='filter'
                    className="absolute left-0 top-0 mt-2 ml-3 text-gray-600 text-sm font-semibold"
                >
                   
                </label>
            </div>
   
        </>
    )
}

export default DropDown
