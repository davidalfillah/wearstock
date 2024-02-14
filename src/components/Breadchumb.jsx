import {
  DoNotTouch,
  DownloadOutlined,
  FavoriteBorderOutlined,
  FolderOutlined,
  Home,
  PeopleOutline,
  PermMediaOutlined,
  Person,
  Person2Outlined,
  PhotoLibraryOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const BreadcrumbsBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      borderBottom={"1px solid #d8d8d8"}
      position={"sticky"}
      alignItems={"center"}
      minHeight={"50px"}
      top={62}
      px={2}
      zIndex={5}
      bgcolor={"#fff"}
      gap={{ xs: 2, sm: 5, md: 5, lg: 5 }}
    >
      <Box
        display={"flex"}
        width={"100%"}
        maxWidth={"87.5rem"}
        alignItems={"center"}
        gap={2}
      >
        <Home />
        {"/"}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: location.pathname === "/profile/transactions" && 600,
          }}
        >
          Create Resource
        </Typography>
      </Box>
    </Box>
  );
};

export default BreadcrumbsBar;
