import {
  DownloadOutlined,
  FavoriteBorderOutlined,
  FolderOutlined,
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
import { useUserContext } from "../contexts/AuthContext";

const ProfileMenu = () => {
  const {
    user,
    setUser,
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
    setIsAuthenticated,
  } = useUserContext();
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center" }}
      borderBottom={"1px solid #d8d8d8"}
      position={"sticky"}
      top={72}
      my={1}
      zIndex={5}
      bgcolor={"#fff"}
      gap={{ xs: 2, sm: 5, md: 5, lg: 5 }}
    >
      <Box
        sx={{ cursor: "pointer" }}
        borderBottom={location.pathname === "/profile/me" && "2px solid #000"}
        px={1}
        gap={1}
        onClick={() => {
          if (location.pathname !== "/profile/me") {
            navigate({ pathname: "/profile/me" }, { replace: true });
          }
        }}
        py={1}
        display={"flex"}
        alignItems={"center"}
      >
        <Person2Outlined fontSize="small" />
        <Typography
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          sx={{
            fontSize: "14px",
            outline: "none",
            border: "none",
            fontWeight: location.pathname === "/profile/me" && 600,
          }}
        >
          Profile
        </Typography>
      </Box>
      <Box
        sx={{ cursor: "pointer" }}
        borderBottom={
          location.pathname === "/profile/downloads" && "2px solid #000"
        }
        onClick={() => {
          if (location.pathname !== "/profile/downloads") {
            navigate({ pathname: "/profile/downloads" }, { replace: true });
          }
        }}
        px={1}
        gap={1}
        py={1}
        display={"flex"}
        alignItems={"center"}
      >
        <DownloadOutlined fontSize="small" />
        <Typography
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          sx={{
            fontSize: "14px",
            fontWeight: location.pathname === "/profile/downloads" && 600,
          }}
        >
          Downloads
        </Typography>
      </Box>
      <Box
        sx={{ cursor: "pointer" }}
        borderBottom={
          location.pathname === `/profile/favorites/${user.id}` &&
          "2px solid #000"
        }
        onClick={() => {
          if (location.pathname !== `/profile/favorites/${user.id}`) {
            navigate(
              { pathname: `/profile/favorites/${user.id}` },
              { replace: true }
            );
          }
        }}
        px={1}
        gap={1}
        py={1}
        display={"flex"}
        alignItems={"center"}
      >
        <FavoriteBorderOutlined fontSize="small" />
        <Typography
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          sx={{
            fontSize: "14px",
            fontWeight:
              location.pathname === `/profile/favorites/${user.id}` && 600,
          }}
        >
          Favorites
        </Typography>
      </Box>
      <Box
        sx={{ cursor: "pointer" }}
        borderBottom={
          location.pathname === "/profile/followings" && "2px solid #000"
        }
        onClick={() => {
          if (location.pathname !== "/profile/followings") {
            navigate({ pathname: "/profile/followings" }, { replace: true });
          }
        }}
        px={1}
        gap={1}
        py={1}
        display={"flex"}
        alignItems={"center"}
      >
        <PeopleOutline fontSize="small" />
        <Typography
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          sx={{
            fontSize: "14px",
            fontWeight: location.pathname === "/profile/followings" && 600,
          }}
        >
          Followings
        </Typography>
      </Box>
      <Box
        sx={{ cursor: "pointer" }}
        borderBottom={
          location.pathname === "/profile/my-collections" && "2px solid #000"
        }
        onClick={() => {
          if (location.pathname !== "/profile/my-collections") {
            navigate(
              { pathname: "/profile/my-collections" },
              { replace: true }
            );
          }
        }}
        px={1}
        gap={1}
        py={1}
        display={"flex"}
        alignItems={"center"}
      >
        <FolderOutlined fontSize="small" />
        <Typography
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          sx={{
            fontSize: "14px",
            fontWeight: location.pathname === "/profile/my-collections" && 600,
          }}
        >
          My Collections
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: location.pathname === "/profile/my-collections" && 600,
          }}
        >
          150
        </Typography>
      </Box>
      <Box
        sx={{ cursor: "pointer" }}
        borderBottom={
          location.pathname === "/profile/transactions" && "2px solid #000"
        }
        onClick={() => {
          if (location.pathname !== "/profile/transactions") {
            navigate({ pathname: "/profile/transactions" }, { replace: true });
          }
        }}
        px={1}
        gap={1}
        py={1}
        display={"flex"}
        alignItems={"center"}
      >
        <ReceiptOutlined fontSize="small" />
        <Typography
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          sx={{
            fontSize: "14px",
            fontWeight: location.pathname === "/profile/transactions" && 600,
          }}
        >
          Transaction
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileMenu;
