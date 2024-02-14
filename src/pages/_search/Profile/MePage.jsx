import { Box } from "@mui/material";
import React from "react";
import Header3 from "../../../components/Header3";
import ProfileMenu from "../../../components/profileMenu";
import EditProfile from "../../../components/EditProfile";

const MePage = () => {
  return (
    <Box pb={5}>
      <Header3 />
      <ProfileMenu />
      <EditProfile />
    </Box>
  );
};

export default MePage;
