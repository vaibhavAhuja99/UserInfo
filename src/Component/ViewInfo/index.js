import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'

const Index = () => {
  const [searchData, setSearchData] = useState("");
  const [dataArr, setDataArr] = useState([]);
  const [lengthFlag, setLengthFlag] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(null);
  let baseURL = 'https://www.example.com'

  let userList = JSON.parse(localStorage.getItem("userList"))

  let dataInfo;
  const handelsearch = () => {
    //axios.get(baseURL/searchData)
    let userData = JSON.parse(localStorage.getItem("userList"));
    dataInfo = userData?.filter((dt) => dt?.Id === searchData);
    setDataArr(dataInfo);
    if (dataInfo?.length > 0) {
      setLengthFlag(true);
      setIsDataPresent(false);
    } else {
      setLengthFlag(false);
      setIsDataPresent(true);
    }

  };


  const navigate = useNavigate();

  const handelUpdate = (userinfo) => {
    navigate("/updateinfo");
    localStorage.setItem("userInfo", JSON.stringify(userinfo));
  };

  const handelDelete = (datainfo) => {
    const getUserList = userList.filter(user => user.Id !== datainfo.Id)
    //axios.delete(baseURL/datainfo.Id)
    localStorage.setItem("userList", JSON.stringify(getUserList))
    setDataArr(getUserList)
  };


  const handelprofile = (userData) => {
    localStorage.setItem("userID", JSON.stringify(userData))
    navigate("/addprofile")
  }

  return (
    <div>
      <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={12}
          sx={{
            margin: 12,
            height: 700,
            width: 600,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h4" sx={{ fontSize: { xs: 14, sm: 20, md: 24, lg: 28 }, mt: 5 }}>
            Account
          </Typography>
          <TextField
            sx={{ width: "90%", mt: 4 }}
            id="outlined-basic"
            label="Account Id"
            variant="outlined"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />

          <Stack direction='row' spacing={4} sx={{ mt: 5 }}>
            <Button
              variant="contained"
              onClick={() => handelsearch()}
            >
              <Typography sx={{ fontSize: { xs: 9, sm: 12, md: 14, lg: 16 } }}>Find</Typography>
            </Button>

            {!lengthFlag && <Button
              variant="contained"
              onClick={() => navigate("/accinfo")}
            >
              <Typography sx={{ fontSize: { xs: 9, sm: 12, md: 14, lg: 16 } }}>Create Account</Typography>
            </Button>}
          </Stack>

          <Box component="div" sx={{ width: "80%", mt: 3 }}>
            {isDataPresent ? "Account not found !!! create your account" : ""}
            <List
              sx={{ bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {dataArr?.map((da, i) => (
                <>
                  <ListItemButton key={i}>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
                            textTransform: "capitalize",
                          }}
                        >
                          {da.Id}
                        </Typography>
                      }
                    />
                    <Stack direction={{ xs: "column", sm: "row", md: "row", lg: "row" }} spacing={0.5}>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handelprofile(da)}
                        sx={{ fontSize: { xs: 9, sm: 12, md: 14, lg: 16 } }}
                      >
                        Add Profile
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handelUpdate(da)}
                        sx={{ fontSize: { xs: 9, sm: 12, md: 14, lg: 16 } }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handelDelete(da)}
                        sx={{ fontSize: { xs: 9, sm: 12, md: 14, lg: 16 } }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </ListItemButton>
                </>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Index;
