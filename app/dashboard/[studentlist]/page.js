"use client";
import axios from "axios";
import StudentsList from "../../../components/StudentsList";
import StudentForm from "../../../components/StudentForm";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import NavbarMain from "../../../components/NavbarMain";
import { GrAddCircle } from "react-icons/gr";

const StudentList = () => {
  const [useCheck, setUseCheck] = useState(false);
  const [useData, setUseData] = useState([]);
  const [useSearchQuery, setUseSearchQuery] = useState("");
  const [useCurrentPage, setUseCurrentPage] = useState(1);
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie.split("=")[1];
    const headers = {
      Authorization: `Bearer ${cookieValue}`,
    };
    // axios
    //   .get("https://flipr-yi8b.onrender.com/api/test2", { headers })
    //   .then((response) => {
    //     console.log("SUCCESS");
    //     setUseCheck(true);
    //   })
    //   .catch((error) => {
    //     window.location.href = "/";
    //   });
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
          setUseCheck(true);
     });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://flipr-yi8b.onrender.com/api/all_students"
        );
        //  console.log(response.data.results);
        setUseData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const studentsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const initialPage = Number(router.query?.page) || 1;
    setUseCurrentPage(initialPage);
  }, [router.query?.page]);

  const handlePageChange = (newPage) => {
    setUseCurrentPage(newPage);
    router.push(`/studentlist`);
  };
  const filteredStudents = useData?.filter((students) =>
    students.name.toLowerCase().includes(useSearchQuery.toLowerCase())
  );

  return useCheck ? (
    isFormShown ? (
      <>
        <StudentForm setIsFormShown={setIsFormShown} />
      </>
    ) : (
      <>
        <header>
          <NavbarMain />
        </header>
        <main>
          <div className=" w-11/12 m-auto p-4">
            <div className=" flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-2xl font-bold mb-4 text-[#012970] ">
                Student Management
              </h1>
              <div className="relative mt-2 w-fit rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500">
                    <MdOutlineSearch />
                  </span>
                </div>
                <input
                  type="text"
                  value={useSearchQuery}
                  onChange={(e) => setUseSearchQuery(e.target.value)}
                  className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search by Name"
                />
              </div>
              <button
                className="mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                onClick={() => setIsFormShown(true)}
              >
                <span className="flex flex-row justify-around items-center gap-1 text-center "><GrAddCircle className="text-xl" /> Add New Student</span>
              </button>
            </div>
            <StudentsList
              students={filteredStudents}
              studentsPerPage={studentsPerPage}
              currentPage={useCurrentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
        <footer></footer>
      </>
    )
  ) : (
    <></>
  );
};

export default StudentList;
