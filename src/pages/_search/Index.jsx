import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header1 from "../../components/Header1";
import HeaderMenu from "../../components/HeaderMenu";
import Footer1 from "../../components/Footer1";
import Filter from "../../components/Filter";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  ArrowBackIos,
  ArrowBackIosNew,
  Close,
  FirstPage,
  InsertDriveFileOutlined,
  InterestsOutlined,
  KeyboardArrowLeft,
  PaletteOutlined,
  Tune,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import FilterCategory from "../../data/Filter.json";
import HeaderAds1 from "../../components/HeaderAds1";
import FooterAds1 from "../../components/FooterAds1";

const IndexSearch = () => {
  return (
    <Box>
      <HeaderMenu />
      <Outlet />
      <FooterAds1 />
      <Footer1 />
    </Box>
  );
};

export default IndexSearch;
