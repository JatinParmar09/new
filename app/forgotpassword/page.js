'use client';
import Navbar from "../../components/Navbar";
import { toast } from 'sonner';
import axios from "axios";
import { useState } from "react";
export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post("https://flipr-yi8b.onrender.com/api/email", {
        email: e.target.name.value,
      })
      .then((response) => {
        // console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        console.error(error);
      });
      setIsLoading(false);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="grid place-items-center h-[75vh]">
        <div className="flex flex-col items-center justify-center bg-white w-96 h-fit rounded-md shadow-lg">
          <form
            onSubmit={showToast}
            className="flex flex-col gap-4 m-0 p-3 w-96"
          >
            <label htmlFor="name">
              Email
              </label>
              <input
                className="block w-full rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter your e-mail"
                type="email"
                name="name"
                id="name"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? 'cursor-wait' : ''} bg-[#4154F1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
              >
                {isLoading ? 'Loading...' : 'Send Email'}
              </button>
          </form>
        </div>
      </div>
    </>
  );
}
