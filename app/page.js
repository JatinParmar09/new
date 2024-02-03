'use client'
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { PiStudentDuotone } from "react-icons/pi";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
export default function Home() {


  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className=" flex flex-col content-center justify-evenly h-[75vh] p-5">
        <div>
        <h1 className=" text-center text-4xl text-[#012970] ">Welcome to <span className="bg-[#012970] text-white p-1"><span className=" font-bold">EDU</span>sync</span></h1>
        <p className="text-center text-[#012970] font-semibold text-xl m-6 ">Synchronizing Education with Technology, One QR Code at a Time!</p>
        </div>
        <div className="flex justify-evenly items-center bg-gray-100">
          <div className="flex flex-col items-center justify-center w-64 h-40 text-white bg-blue-500 m-4 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer hover:border-2 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 ">
            <Link href={{
          pathname: '/login',
          query: { admin: true }
        }}>
          <div><RiAdminLine  className="text-4xl  text-center m-auto" /></div>
              <div className=" text-xl">Admin Login</div>
            </Link>
          </div>
          <div className="flex flex-col items-center text-white justify-center text-center w-64 h-40 bg-blue-500 m-4 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer hover:border-2 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 ">
            <Link href={{
          pathname: '/login',
          query: { admin: false }
        }}>
          <div><PiStudentDuotone className="text-4xl text-center m-auto" /></div>
              <div className=" text-xl">Student Login</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
// import { Provider } from 'react-redux';
// import store from './store'; // Assuming store.js is in ../store

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;
