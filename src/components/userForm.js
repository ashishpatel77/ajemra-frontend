import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import axios from "axios";

export default function UserForm({ open, handleClose }) {
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  const closeDialog = () => {
    handleClose(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSaveData = () => {
    console.log("values", values);
    if (values.firstName === "") {
      alert("Please Enter First Name");
    } else if (values.lastName === "") {
      alert("Please Enter Last Name");
    } else if (values.email === "") {
      alert("Please Enter Your Email ID");
    } else if (values.avatar === "") {
      alert("Please Enter Your Profile URL");
    } else {
      console.log("else pat");
      let myObj = {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        avatar: values.avatar,
      };
      axios
        .post("http://localhost:5000/users", myObj)
        .then((res) => {
          console.log("res", res);
          setValues({
            email: "",
            firstName: "",
            lastName: "",
            avatar: "",
          });
          handleClose(false);
          // setMyArray(res.data.userData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>User Form</DialogTitle>
        <DialogContent>
          <Grid container width={"100%"} alignItems={"center"}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                type="firstName"
                fullWidth
                name="firstName"
                variant="standard"
                value={values.firstName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container width={"100%"} alignItems={"center"}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Last Name"
                type="lastName"
                fullWidth
                name="lastName"
                variant="standard"
                value={values.lastName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container width={"100%"} alignItems={"center"}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                name="email"
                variant="standard"
                value={values.email}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container width={"100%"} alignItems={"center"}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Profile Url"
                type="avatar"
                fullWidth
                name="avatar"
                variant="standard"
                value={values.avatar}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveData}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
