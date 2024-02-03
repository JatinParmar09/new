import Image from "next/image";
import Navbar from "../../components/Navbar";
export default function login() {
    return (
      <>
      <Navbar/>
      <div className=" flex flex-row h-screen w-screen justify-around items-center">
        <Image  src={'/login.jpg'} alt="Picture of the author" className="w-fit h-fit  hidden lg:block " width={400} height={400}/>
        <div className=" flex flex-col items-center justify-center bg-white w-96 h-96 rounded-md shadow-lg">
          <form className=" flex flex-col gap-4 m-0 p-3 w-96" >
            <label>
              Username
            </label>
            <input className=" block w-full rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Email id" type="email" name="name" />
            <label>
              Password
            </label>
            <input type="password" name="name" placeholder="Password" className=" block w-full rounded-md border-0 p-1 pl-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"/>
            <button type="submit" className="bg-[#4154F1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
          </form>
        </div>
      </div>
      </>
    )
  }