import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ProfilePage;
