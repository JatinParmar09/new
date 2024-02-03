'use client'
import { React, useEffect, useState, useRef, useCallback } from 'react'
import QRScanner from 'qr-scanner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const Scanner = () => {

  const [check, setCheck] = useState(false);
  useEffect(() => {
    const cookieValue = document.cookie.split('=')[1];
    const headers = {
      Authorization: `Bearer ${cookieValue}`
    }

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
  const router = useRouter();
  const [hasScanned, setHasScanned] = useState(false);
  const videoRef = useRef();

  let scanning = false;
  
  const handleSuccess = useCallback(() => {
    if (scanning) {
      return;
    }
    scanning = true;
    toast.success('QR Code scan successful!');
    router.push('/student-dashboard');
    toast.dismiss();
    setHasScanned(true);
    scanning = false;
  }, []);

  useEffect(() => {
    let scanner;
    const videoElem = videoRef.current;
    const userid = parseInt(localStorage.getItem('UserID'));
    console.log(userid, typeof (userid));
    async function startScanner() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      const videoElem = videoRef.current;
      if (videoElem) {
        videoElem.srcObject = stream;
        scanner = new QRScanner(videoElem, result => {
          if (!hasScanned) {
            console.log('decoded qr code:', result)
            console.log(typeof (result));
            handleSuccess();
            // Send the result to the backend
            axios.post('https://flipr-yi8b.onrender.com/api/mark_attendance', {
              student_id: userid,
              qr_id: result
            }).then((response) => {
              console.log('Success')
              setHasScanned(true);
            })
              .catch((error) => { console.log('Error') });
            // router.push('/student-dashboard');
          }
        });
        scanner.start();
      }
    }

    startScanner().catch('ScannerError', console.error);
    return () => {
      if (scanner) {
        scanner.stop();
        scanner.destroy();
      }
    };
  }, [handleSuccess, hasScanned]);
  return (
    check ? (
      <>
        <div className='flex flex-col justify-center items-center p-5'>
          <p className='text-2xl text-blue-700 font-semibold'>Scan the QR Code</p>
          <div className=' flex justify-center place-items-center h-[75vh]'>
            <video ref={videoRef} autoPlay playsInline className='w-fit h-fit'></video>
          </div>
        </div>
      </>) : <></>
  )
}

export default Scanner