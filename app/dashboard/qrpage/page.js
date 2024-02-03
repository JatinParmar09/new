'use client'
import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode.react';
import NavbarMain from '../../../components/NavbarMain';
import axios from 'axios';

const QRPage = () => {
  const [check, setCheck] = useState(false);
  const [url, setUrl] = useState('');
  const [socket, setSocket] = useState(null);
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

  useEffect(() => {
    const ws = new WebSocket('wss://flipr-yi8b.onrender.com');

    ws.onopen = () => {
      console.log('Connection established');
    };

    ws.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      setUrl(event.data);

    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);
  const sendMessage = () => {
    if (socket) {
      socket.send('Your message');
    }
  };

  return (
    check ? (
      <>
        <header>
          <NavbarMain />
        </header>
        <main>
          <div className="flex flex-col items-center justify-center h-[75vh] bg-gray-100">
            <div className="shadow-md rounded-lg bg-white p-4">
              <h1 className="text-2xl font-bold mb-2">Scan to mark attendance</h1>
              <div className="flex justify-center items-center mb-4">
                {(url === 'WAIT FOR ONE MINUTE' || url === '' ? (<p>WAIT FOR ONE MINUTE</p>) : <QRCode value={url} size={200} />)}
              </div>
            </div>
          </div>
        </main>
      </>) : <></>
  )
}

export default QRPage