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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(
      "https://bckprj25-1.onrender.com/api/v1/attendance/students-attendance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students || []); // your backend returns array directly
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="tableset mt-10">
      <h1 className="text-2xl font-extrabold text-orange-600 pb-10">Student List</h1>

      <StudentSearch />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="students table">
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Present</TableCell>
                <TableCell>Absent</TableCell>
                <TableCell>Attendance %</TableCell>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((stu) => (
                  <TableRow key={stu.studentId} hover>
                    <TableCell>{stu.name}</TableCell>
                    <TableCell>{stu.email}</TableCell>
                    <TableCell>{stu.presentDays}</TableCell>
                    <TableCell>{stu.absentDays}</TableCell>

                    <TableCell
                      style={{
                        color: stu.percentage > 75 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {stu.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </div>
  );
}

export default StudentTable;
