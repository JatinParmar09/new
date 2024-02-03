import Pagination from "./Pagination";
function StudentsList({ students, studentsPerPage, currentPage, onPageChange }) {
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = Math.min(startIndex + studentsPerPage, students.length);
  const currentStudents = students.slice(startIndex, endIndex);

  return (
    <>
    <div className=" overflow-scroll md:overflow-hidden">
      <table className=" w-full p-5 mr-5">
        <thead>
          <tr className=" border-b-2 border-blue-500">
            <th className="p-4 text-left font-semibold">Roll No</th>
            <th className="p-4 text-left font-semibold">Name</th>
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.student_id} className=" bg-white border-b-[1px] border-blue-700 hover:bg-slate-100">
              <td className="p-4">{student.roll_no}</td>
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.email}</td>
              <td className="p-4">{student.mobile_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Pagination
        totalStudents={students.length}
        studentsPerPage={studentsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

    </>

  );
}

export default StudentsList;