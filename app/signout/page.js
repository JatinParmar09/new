'use client'
import React, { useEffect } from 'react'

const SignOut = () => {
    useEffect(() => {
        localStorage.clear();
        let cookies = document.cookie.split(";");
    
        for (let value of cookies) {
            let cookie = value;
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }, []);
    
    const handleChange = () => {
        window.location.href = '/';
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Signed Out Successfully</h1>
            <div className="mb-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={handleChange}>Login Page</button>
            </div>
        </div>
    )
}

export default SignOut