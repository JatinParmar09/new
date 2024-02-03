/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMain from '../../components/NavbarMain';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { FaSun, FaRegMoon } from 'react-icons/fa';
import { MdOutlineQrCodeScanner } from "react-icons/md";
const StudentDashboardPage = () => {
    const [sPresent, setSPresent] = useState(0);
    const [check, setCheck] = useState(false);
    const [sAbsent, setSAbsent] = useState(0);
    const isLargerThan600 = useMediaQuery({ query: '(min-width: 600px)' });
    const router = useRouter();
    useEffect(() => {

        const cookieValue = document.cookie.split('=')[1];
        console.log(cookieValue);
        const headers = {
            Authorization: `Bearer ${cookieValue}`
        }
        console.log(headers);
        axios({
            method: 'get',
            url: 'https://flipr-yi8b.onrender.com/auth/test2',
            headers: headers,
            validateStatus: (status) => {
                return true; 
            },
        }).catch(error => {
            console.error(error.message);
        }).then(response => {
            console.log('SUCCESS');
            setCheck(true);
        });
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userid = localStorage.getItem('UserID');
            if (userid) {
                axios.post('https://flipr-yi8b.onrender.com/api/present_student', { student_id: userid })
                    .then(response => {
                        setSPresent(response.data.totalPresent);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                axios.post('https://flipr-yi8b.onrender.com/api/absent_student', { student_id: userid })
                    .then(response => {
                        setSAbsent(response.data.totalAbsent);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            } else {
                router.push('/login');
            }
        }
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
                <header className=''>
                    <NavbarMain />
                </header>

                <main className='p-5'>
                    <div className='p-4 md:px-24 '>
                        <div className='flex flex-col md:flex-row justify-between px-10 items-center'>
                            <h1 className='text-4xl text-blue-900 font-bold text-center md:text-left'>
                                Student Dashboard
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
                    <div className='flex justify-center md:justify-end px-5 md:px-40'>
                        <Link className='' href='/student-dashboard/scanner'>
                            <p className='bg-blue-700 text-slate-50 font-semibold hover:bg-blue-900 w-fit shadow-md rounded px-4 py-2 flex justify-between items-center overflow-hidden ml-auto'>
                                {isLargerThan600 ? (
                                    <span className="flex flex-row items-center justify-between gap-1"><MdOutlineQrCodeScanner className='text-2xl' />QR Scanner</span>
                                ) : (
                                    <span className=" "><MdOutlineQrCodeScanner className='text-2xl' /></span>
                                )}
                            </p>
                        </Link>
                    </div>
                    <p className=' font-extrabold text-[#012970] text-2xl text-center p-6 pt-0'>
                        Today's Stats
                    </p>
                    <div className='flex flex-wrap justify-evenly gap-3 p-5'>
                        <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit overflow-hidden'>
                            <div>Present | Total</div>
                            <div>
                                <div className='font-normal'>{sPresent}</div>
                            </div>
                        </div>
                        <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit overflow-hidden'>
                            <div>Absent | Total</div>
                            <div>
                                <div className='font-normal'>{sAbsent}</div>
                            </div>
                        </div>
                        <div className='bg-white shadow-lg p-6 rounded w-full text-[#012970] font-bold md:w-fit overflow-hidden'>
                            <div>Attendance | Till Today</div>
                            <div>
                                <div className='font-normal'>{((sPresent / (sPresent + sAbsent)) * 100).toFixed(1)}%</div>
                            </div>
                        </div>
                    </div>

                </main>
                <footer></footer>
            </>) : <></>
    );
};

export default StudentDashboardPage;
