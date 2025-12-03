import React, { useEffect, useState } from "react";
import StudentSearch from "./StudentSearch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("https://bckprj25-1.onrender.com/api/v1/attendance/students-attendance", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students || []);
        setFilteredStudents(data.students || []); // initialize filtered students
      })
      .catch(() => console.error("Error fetching students"));
  }, []);

  return (
    <div className="tableset mt-10 px-3 md:px-0">
      <h1 className="text-xl md:text-2xl font-extrabold text-orange-600 pb-6">
        Student List
      </h1>

      {/* Pass setFilteredStudents to StudentSearch */}
      <StudentSearch onFilterChange={setFilteredStudents} />

      <Paper sx={{ width: "100%", overflow: "hidden" }} className="mt-5">
        <div className="overflow-x-auto w-full">
          <Table stickyHeader aria-label="students table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="text-xs md:text-sm font-bold">Student Name</TableCell>
                <TableCell className="text-xs md:text-sm font-bold">Email</TableCell>
                <TableCell className="text-xs md:text-sm font-bold">Present</TableCell>
                <TableCell className="text-xs md:text-sm font-bold">Absent</TableCell>
                <TableCell className="text-xs md:text-sm font-bold">Attendance %</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((stu) => (
                  <TableRow key={stu.studentId} hover>
                    <TableCell className="text-xs md:text-sm">{stu.name}</TableCell>
                    <TableCell className="text-xs md:text-sm">{stu.email}</TableCell>
                    <TableCell className="text-xs md:text-sm">{stu.presentDays}</TableCell>
                    <TableCell className="text-xs md:text-sm">{stu.absentDays}</TableCell>
                    <TableCell
                      className="text-xs md:text-sm font-bold"
                      style={{ color: stu.percentage > 75 ? "green" : "red" }}
                    >
                      {stu.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>
    </div>
  );
}

export default StudentTable;
