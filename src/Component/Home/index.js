import React from "react";
import {useNavigate} from 'react-router-dom'
import { Box, Button, Paper, Typography, Stack } from "@mui/material";



const Index = () => {
    
    const navigate = useNavigate();
   

  return (
    <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={12}
        sx={{
          margin: 12,
          height: 400,
          width: 500,
          borderRadius: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={6} sx={{ width: 230 }}>
                  <Button variant="contained" sx={{ p: 1.5 }} onClick={() => navigate("/accinfo")}>
            <Typography>Create Account</Typography>
          </Button>
                  <Button variant="contained" sx={{ p: 1.5 }} onClick={() => navigate("/viewinfo")}>
            <Typography>View Account</Typography>
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Index;
