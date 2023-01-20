import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
const Index = () => {
    let userList = JSON.parse(localStorage.getItem("userList"))
    const [profileData, setProfileData] = useState("");
    const [profilefield, setProfilefield] = useState("");
    const [profileError, setProfileError] = useState("");

    useEffect(() => {
        let userID = JSON.parse(localStorage.getItem("userID"))
        setProfileData(userID?.Id)
    }, [])

    const handelAdd = () => {
        if (profilefield.length === 0) {
            setProfileError("Name required*")
            return
        } else {
            setProfileError("")
        }
        let a = userList
        for (var i = 0; i < userList?.length; i++) {
            if (profileData === userList[i]?.Id) {
                a[i].profile.push(profilefield);
                break;
            }
        }
        localStorage.setItem("userList", JSON.stringify(userList))
        setProfilefield("")
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

                    <TextField
                        sx={{ width: "90%", mt: 4, fontSize: { xs: 9, sm: 12, md: 15, lg: 18 } }}
                        id="outlined-basic"
                        label="Account Id"
                        variant="outlined"
                        value={profileData}
                        onChange={(e) => setProfileData(e.target.value)}
                        disabled
                    />

                    <Box component='div' sx={{ width: "80%", mt: 5 }}>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography variant="h4" sx={{ fontSize: { xs: 14, sm: 20, md: 24, lg: 28 } }}>Add profile</Typography>
                        </Box>
                        <TextField
                            sx={{ width: "90%", mt: 4 }}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={profilefield}
                            onChange={(e) => setProfilefield(e.target.value)}
                        />
                        <div><small style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{profileError}</small></div>

                        <Button
                            variant="contained"
                            onClick={() => handelAdd()}
                            sx={{ p: 1.5, mt: 4, fontSize: { xs: 9, sm: 12, md: 15, lg: 18 } }}
                        >
                            Add
                        </Button>
                    </Box>

                </Paper>
            </Box>
        </div>
    );
};

export default Index;
