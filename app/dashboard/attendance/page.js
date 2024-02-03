'use client'
import React, { useEffect, useState } from 'react'
import NavbarMain from '../../../components/NavbarMain'
import AttendanceManagement from '../../../components/AttendanceManagement'
import axios from 'axios'
const Attendance = () => {
  const[check,setCheck] = useState(false);
  useEffect( () => {
    const cookieValue = document.cookie.split('=')[1];
    const headers = {
      Authorization: `Bearer ${cookieValue}`
    }
  //    axios.get("https://flipr-yi8b.onrender.com/api/test2",
  //    {headers}
  //    )
  //     .then((response) => {
  //       console.log("SUCCESS");
  //       setCheck(true);})
  //     .catch((error) => {
  //       window.location.href = '/';    
  // }
  //   ); 
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

  return (
    check ? (
    <>
    <header>
        <NavbarMain/>
    </header>
    <main>
        <AttendanceManagement/>
    </main>
    </>) : <></>
  )
}

export default Attendance