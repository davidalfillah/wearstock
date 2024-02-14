import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";
import Hero1 from "../../components/Hero1";
import Footer1 from "../../components/Footer1";

const IndexRoot = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <main>
        <Outlet />
        <Footer1 />
      </main>
    </Box>
  );
};

export default IndexRoot;
