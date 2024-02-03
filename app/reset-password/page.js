'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  function getTokenFromURL() {
    if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
    }
  }
  const token = getTokenFromURL();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://flipr-yi8b.onrender.com/auth/reset_password', { token, newPassword: password });
      console.log(response.data); 
      toast.success('Password reset successful!');
    } catch (error) {
      console.error(error);
      toast.error('password reset failed');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col items-center justify-center bg-white w-96 h-fit rounded-md shadow-lg">
          <form className="flex flex-col gap-4 m-0 p-3 w-96" onSubmit={handleSubmit}>
            <label>
              New Password:
              <input
                className="block w-full rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter your new Password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? 'cursor-wait' : ''} bg-[#4154F1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
              >
                {isLoading ? 'Loading...' : 'Update Password'}
              </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword