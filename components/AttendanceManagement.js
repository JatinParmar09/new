'use client'
import { useState, React, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import axios from 'axios';
import DropDown from './DropDown';

const AttendanceManagement = () => {

  const [filter, setFilter] = useState("All");
  const [selectedDay, setSelectedDay] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [studentsList, setStudentsList] = useState([]);

    const handleDayClick = (day) => {
      setSelectedDay(day);
    };

  useEffect(() => {
    axios.post('https://flipr-yi8b.onrender.com/api/day_attendance', { date: format(selectedDay, 'yyyy-MM-dd') })
      .then(response => {
        setStudentsList(response.data.results);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedDay]);
  
  const [presentStudents, setPresentStudents] = useState(0);
  useEffect(() => {
    axios.post('https://flipr-yi8b.onrender.com/api/total_present', { date: format(selectedDay, 'yyyy-MM-dd') })
      .then(response => {
        setPresentStudents(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedDay]);


  const [absentStudents, setAbsentStudents] = useState(0);
  useEffect(() => {
    axios.post('https://flipr-yi8b.onrender.com/api/total_absent', { date: format(selectedDay, 'yyyy-MM-dd') })
      .then(response => {
        setAbsentStudents(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedDay]);

  return (
    <>
      <div className="p-4">
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-3xl font-extrabold text-black mb-4 text-center w-screen">Attendance Management</h1>
          <div className=' flex flex-col md:flex-row justify-evenly w-full items-center'>
            <DayPicker className='overflow-scroll md:overflow-auto' selected={selectedDay} onDayClick={handleDayClick} />
            <div className=' flex flex-col h-max justify-between'>
              <div className=' bg-white shadow-md m-5 rounded-md p-4  font-semibold'>
                Total Present | {format(selectedDay, 'dd-MM-yyyy')}
                <div className='text-center font-semibold text-green-600'>
                  {presentStudents}
                </div>
              </div>
              <div className=' bg-white shadow-md m-5 rounded-md p-4 font-semibold '>
                Total Absent | {format(selectedDay, 'dd-MM-yyyy')}
                <div className='text-center font-semibold text-red-600'>
                  {absentStudents}
                </div>
              </div>
            </div>
          </div>
        </div>
        <span>Filter by status: </span><DropDown filter={filter} setFilter={setFilter} />
        <div className='overflow-scroll md:overflow-auto'>
          <table className="min-w-full divide-y-2 divide-gray-300 table:auto" >
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentsList.filter(record => filter === 'All' || record.status === filter).map((record) => (
                <tr key={record.student_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{format(record.date, 'yyyy-MM-dd')}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${record.status === 'present' ? 'text-green-500' : 'text-red-500'}`}>
                    {record.status}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AttendanceManagement;