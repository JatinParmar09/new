import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import PropTypes from 'prop-types';
const StudentForm = ({setIsFormShown}) => {
  const [newStudent, setNewStudent] = useState({ student_id: '', name: '', mobile_number: '', email: '', password: '' });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://flipr-yi8b.onrender.com/auth/student_signup', newStudent);
      toast.success('Student added successfully!');
      console.log(response.data);
      setNewStudent({ student_id: '', name: '', mobile_number: '', email: '', password: '' });
      setIsFormShown(false);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="fixed top-0 left-0  w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 w-[50vw] rounded shadow-lg ">
        <div className=''>
          <button className='top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded' type="button" onClick={() => setIsFormShown(false)}>Close</button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-[#012970]">Add New Student</h2>
        <label className=" text-gray-600">
          Student ID:
          <input type="number" className=' block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' id="student_id" autoComplete="off" value={newStudent.student_id} onChange={(e) => setNewStudent({ ...newStudent, student_id: e.target.value })} placeholder="Student ID" required />
        </label>
        <label className=" text-gray-600">
          Name:
          <input  type="text" className=' block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6' id="name" autoComplete="off" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} placeholder="Name" required />
        </label>
        <label className=" text-gray-600">
          E-Mail:
          <input type="text" className=' block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6' id="email" autoComplete="off" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} placeholder="E-Mail" required />
        </label>
        <label className=" text-gray-600">
          Mobile Number:
          <input type="number" className=' block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' id="mobile_number" autoComplete="off" value={newStudent.mobile_number} onChange={(e) => setNewStudent({ ...newStudent, mobile_number: e.target.value })} placeholder="Mobile Number" required />
        </label>
        <label className=" text-gray-600">
          Password:
          <input type="text" className=' block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6' id="password" autoComplete="off" value={newStudent.password} onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} placeholder="Password" required />
        </label>
        <button type="submit" className='mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Student</button>
      </div>
    </form>
  )
}

export default StudentForm