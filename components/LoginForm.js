"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
const LoginForm = ({ value }) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSuccess = () => {
    toast.success("Login successful!");
  };

  const handleError = () => {
    toast.error("Login failed. Invalid credentials.");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Send login credentials to your backend for authentication using Axios
      const response = await axios.post(
        "https://flipr-yi8b.onrender.com/auth/admin_login",
        {
          email,
          password,
        }
      );
      if (response.status === 200 && response.data.token) {
        router.push("/dashboard");
        localStorage.setItem("UserID", JSON.stringify(response.data.userID));
        localStorage.setItem("username", JSON.stringify(response.data.name));
        document.cookie = `token=${response.data.token}; HttpOnly:  SameSite=None; Secure;`;
        // Show success toast
        handleSuccess();
      } else {
        // Handle login error
        console.error("Login failed with status ", response.status);
        handleError();
      }
    } catch (error) {
      console.error("Login failed with error ", error);

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      handleError();
    }
    setIsLoading(false);
  };

  const handleSubmitstudent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submit student");
    try {
      // Send login credentials to your backend for authentication using Axios
      const response = await axios.post(
        "https://flipr-yi8b.onrender.com/auth/student_login",
        {
          email,
          password,
        }
      );
      if (response.status === 200 && response.data.accessToken) {
        router.push("/student-dashboard");
        console.log(response.data);
        localStorage.setItem("UserID", JSON.stringify(response.data.userID));
        localStorage.setItem("username", JSON.stringify(response.data.name));
        document.cookie = `accessToken=${response.data.accessToken}`;
        // Show success toast
        handleSuccess();
      } else {
        // Handle login error
        console.error("Login failed with status ", response.status);
        handleError();
      }
    } catch (error) {
      console.error("Login failed with error ", error);

      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      handleError();
    }
    setIsLoading(false);
  };

  return (
        <div className=" flex flex-row h-[80vh] align-middle content-center justify-around items-center">
          <Image src={"/login.svg"} alt="Picture of the author" className=" w-[30vw] h-[70vh]  hidden  lg:block  " width={400} height={400}/>
          <div className=" flex flex-col items-center justify-center bg-white   rounded-md shadow-lg lg:w-96 h-96">
            <form
              id="loginform"
              onSubmit={value == "true" ? handleSubmit : handleSubmitstudent}
              className=" flex flex-col gap-4 m-0 p-3 w-fit lg:w-96"
            >
              <label className=" text-gray-600">
                Username
                <input onChange={(e) => setUsername(e.target.value)} className=" block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Email id" id="name" type="email" autoComplete="off" value={email} />
              </label>
              <label>
                Password
                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} id="password" placeholder="Password" autoComplete="off" className=" block w-full bg-white rounded-md border-0 p-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
              </label>
              <button type="submit" disabled={isLoading} className={`${isLoading ? 'cursor-wait' : ''} bg-[#4154F1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </form>
            <div className="text-sm">
              <a
                href="/forgotpassword"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
            {value == "true" && (
              <>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a User?{" "}
                  <a
                    href="/signup"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Register here
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
  );
};

export default LoginForm;
