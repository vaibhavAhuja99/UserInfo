import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import axios from 'axios'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = ({
  accId,
  fName,
  lName,
  email,
  phone,
  setaccId,
  setfName,
  setlName,
  setEmail,
  setPhone,
  feature
}) => {
  const [error, setError] = useState({ accId: '', email: '', lName: '', fName: '', phone: '' })
  const navigate = useNavigate();
  let flag = true;
  let baseURL = 'https://www.example.com'
  const userInfo = {
    Id: accId,
    fname: fName,
    lname: lName,
    Email: email,
    Phone: phone,
    profile: []
  };

  const handelsubmit = () => {
    const validateEmail = (email) => {
      const re = /^([a-zA-Z0-9_.+-])+@+(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return re.test(String(email).toLowerCase());
    };

    if (!accId) {
      setError(prev => ({ ...prev, accId: "AccountId required*" }))
      flag = false;
    }
    else {
      setError(prev => ({ ...prev, accId: "" }))
    }

    if (!email) {
      setError(prev => ({ ...prev, email: "Email required*" }))
      flag = false;
    }
    else if (!validateEmail(email)) {
      setError(prev => ({ ...prev, email: "Email invalid*" }))
      flag = false;
    }
    else {
      setError(prev => ({ ...prev, email: "" }))
    }

    if (!lName) {
      setError(prev => ({ ...prev, lName: "Lastname required*" }))
      flag = false;
    }
    else {
      setError(prev => ({ ...prev, lName: "" }))
    }

    if (!fName) {
      setError(prev => ({ ...prev, fName: "Firstname required*" }))
      flag = false;
    }
    else {
      setError(prev => ({ ...prev, fName: "" }))
    }

    if (!phone) {
      setError(prev => ({ ...prev, phone: "Phone Number required*" }))
      flag = false;
    }
    else if (phone.length < 10 || phone.length > 10) {
      setError(prev => ({ ...prev, phone: "Phone number should have 10 characters*" }))
      flag = false;
    }
    else {
      setError(prev => ({ ...prev, phone: "" }))
    }
    if (!flag) {
      return false;
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    if (feature === 'ADD') {
      if (userList && userList.length > 0) {
        userList.push(userInfo);
        //axios.post(baseURL, userInfo)
        localStorage.setItem("userList", JSON.stringify(userList));
      } else {
        localStorage.setItem("userList", JSON.stringify([userInfo]));
      }
      setaccId(" ")
      setfName(" ")
      setlName(" ")
      setEmail(" ")
      setPhone(" ")
      navigate("/")
    } else {
      let user = userList
      const getUserIndex = userList.findIndex(user => user.Id === accId)
      if (getUserIndex > -1) {
        user[getUserIndex].fname = fName;
        user[getUserIndex].lname = lName;
        user[getUserIndex].Email = email;
        user[getUserIndex].Phone = phone;
      }
      //axios.put(baseURL/accId, userList[getUserIndex])
      localStorage.setItem("userList", JSON.stringify(userList))
      localStorage.removeItem("userInfo")
      navigate("/")
    }
  };

  return (
    <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={12}
        sx={{
          margin: 12,
          height: 800,
          width: { xs: '100%', lg: 900, md: 600, sm: 400 },
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ margin: "30px 0px 70px 0px", fontSize: { xs: 14, sm: 20, md: 24, lg: 28 } }}>
          Account Information
        </Typography>

        <Box
          component="div"
          sx={{ display: "flex", width: '77%', flexDirection: "column" }}
        >
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", mb: 5 }}
          >
            <TextField
              id="outlined-basic"
              label="Account Id"
              variant="outlined"
              value={accId}
              onChange={(e) => setaccId(e.target.value)}
            />
            <small id="accid" style={{ color: "red", fontWeight: "bold" }}>{error.accId}</small>
          </Box>

          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", mb: 5 }}
          >
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              value={fName}
              onChange={(e) => setfName(e.target.value)}
            />
            <small id="fnameid" style={{ color: "red", fontWeight: "bold" }}>{error.fName}</small>
          </Box>

          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", mb: 5 }}
          >
            <TextField
              id="outlined-basic"
              label="Lirst name"
              variant="outlined"
              value={lName}
              onChange={(e) => setlName(e.target.value)}
            />
            <small id="lnameid" style={{ color: "red", fontWeight: "bold" }}>{error.lName}</small>
          </Box>

          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", mb: 5 }}
          >
            <TextField
              id="outlined-basic"
              label=" Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailid" style={{ color: "red", fontWeight: "bold" }}>{error.email}</small>
          </Box>

          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", mb: 5 }}
          >
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <small id="phoneid" style={{ color: "red", fontWeight: "bold" }}>{error.phone}</small>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{ p: 1.5, mt: 5, width: "30%" }}
          onClick={handelsubmit}
        >
          <Typography sx={{ display: 'flex', fontSize: { xs: 8, sm: 10, md: 12, lg: 16 } }}>Create Account</Typography>
        </Button>
      </Paper>
    </Box>
  );
};

export default Index;
