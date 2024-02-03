/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMain from '../../components/NavbarMain';
import { format } from 'date-fns';
import { FaSun, FaRegMoon } from 'react-icons/fa';
import { BsQrCode } from "react-icons/bs";
const DashboardPage = () => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const cookieValue = document.cookie.split('=')[1];
    const headers = {
      Authorization: `Bearer ${cookieValue}`
    }
    axios({
      method: 'get',
      url: 'https://flipr-yi8b.onrender.com/auth/test',
      headers: headers,
      validateStatus: (status) => {
        return true; // Always returning true, adjust according to your needs
      },
    }).catch(error => {
      console.error(error.message);
    }).then(response => {
      console.log('SUCCESS');
      setCheck(true);
    });
  }, []);

  const [data, setData] = useState(0);
  useEffect(() => {
    axios.get('https://flipr-yi8b.onrender.com/api/total_students')
      .then(response => {
        setData(response.data.totalStudents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //Present Students ->
  const [presentStudents, setPresentStudents] = useState(0);
  useEffect(() => {
    const formattedDate = format((new Date()), 'yyyy-MM-dd');
    axios.post('https://flipr-yi8b.onrender.com/api/total_present', { date: formattedDate })
      .then(response => {
        setPresentStudents(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  //Absent Students ->
  const [absentStudents, setAbsentStudents] = useState(0);
  useEffect(() => {
    const formattedDate = format((new Date()), 'yyyy-MM-dd');
    console.log(formattedDate);
    axios.post('https://flipr-yi8b.onrender.com/api/total_absent', { date: formattedDate })
      .then(response => {
        setAbsentStudents(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const hours = currentDateTime.getHours();
  const IconComponent = hours < 6 || hours > 18 ? FaRegMoon : FaSun;

  return (
    check ? (
      <>
        <header>
          <NavbarMain />
        </header>

        <main className='p-5'>


          <div className='p-4 md:px-24 '>
            <div className='flex flex-col md:flex-row justify-between px-10 items-center'>
              <h1 className='text-4xl text-blue-900 font-bold text-center md:text-left'>
                Admin Dashboard
              </h1>
              <div className='flex flex-row items-center justify-between content-center gap-2 backdrop-blur-md bg-opacity-70 shadow-sm bg-white rounded-lg p-4 '>
                <IconComponent className='mb-2 text-4xl align-middle text-yellow-500' />
                <div className='flex flex-col'>
                  <span className=' font-extrabold text-blue-900'>{days[currentDateTime.getDay()]}</span>
                  <span className=' text-blue-900 '>
                    {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap justify-evenly gap-3 p-3 my-4'>
            <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit'>
              <div>Total Students</div>
              <div>
                <div className='font-normal'>{data}</div>
              </div>
            </div>
            <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit'>
              <div>Present | Today</div>
              <div>
                <div className='font-normal'>{presentStudents}</div>
              </div>
            </div>
            <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit'>
              <div>Absent | Today</div>
              <div>
                <div className='font-normal'>{absentStudents}</div>
              </div>
            </div>
            <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit'>
              <div>Attendance | Today</div>
              <div>
                <div className='font-normal'>
                  {
                    // ((Number(presentStudents)/Number(data))*100)
                    isNaN(data) || data === 0 ? 'N/A' : ((presentStudents / data) * 100).toFixed(1)
                  }%
                </div>
              </div>
            </div>
          </div>


          <div className='flex flex-col md:flex-row justify-between px-5 py-2 md:px-40 items-center'>
            <div className='flex flex-col gap-5 w-fit justify-evenly overflow-hidden'>
              <Link href='/dashboard/studentlist'>
                <div className='bg-white shadow-md rounded px-4 py-2 flex justify-between items-center overflow-hidden'>
                  <span>Student Management</span>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='h-6 w-6 text-gray-500' >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </div>
              </Link>
              <Link href='/dashboard/attendance'>
                <div className='bg-white shadow-md rounded px-4 py-2 flex justify-between items-center overflow-hidden'>
                  <span>Attendance Management</span>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='h-6 w-6 text-gray-500' >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </div>
              </Link>
            </div>
            <div className='w-fit h-fit'>
              <Link href='/dashboard/qrpage'>
                <div className='bg-blue-500 text-white shadow-md rounded px-4 py-4 m-4 md:m-0 flex flex-col justify-between items-center overflow-hidden hover:border-2 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 '>
                  <BsQrCode className='text-4xl' />
                  <span className='font-semibold'>Generate QR</span>
                </div>
              </Link>
            </div>
          </div>
        </main>
        <footer></footer>
      </>) : <></>
  );
};

export default DashboardPage;
