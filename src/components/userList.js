import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, TableContainer } from "@mui/material";
import { useState } from "react";
import UserForm from "./userForm";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [myArray, setMyArray] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);

  const handelFromOpen = () => {
    setFormOpen(true);
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        console.log("res", res.data.userData);
        setMyArray(res.data.userData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [open]);
  return (
    <>
      <div className="header-container">
        <h1>User Table</h1>
        <button onClick={handelFromOpen}>Add User</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr. No.</StyledTableCell>
              <StyledTableCell align="center">Profile</StyledTableCell>
              <StyledTableCell align="center">Email ID</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myArray.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Avatar alt="Remy Sharp" src={data.avatar} />
                </StyledTableCell>
                <StyledTableCell align="center">{data.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {data.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.last_name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && (
        <UserForm open={open} handleClose={(value) => setOpen(value)} />
      )}
    </>
  );
}

// {"page":1,"per_page":6,"total":12,"total_pages":2,"data":[
// {"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},
// {"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},
// {"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},
// {"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},
// {"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},
// {"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}],
// "support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
