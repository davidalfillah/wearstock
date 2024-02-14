import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Link,
  ListItemIcon,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Category from "../data/Category.json";
import reactLogo2 from "../assets/logo2-white.svg";
import {
  ArrowDropDown,
  DownloadOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  FolderOutlined,
  KeyboardArrowDown,
  List,
  Logout,
  MenuOutlined,
  MenuRounded,
  Notifications,
  PeopleOutline,
  Person2Outlined,
  PersonAdd,
  PostAdd,
  ReceiptOutlined,
  Settings,
} from "@mui/icons-material";
import { useUserContext } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../libs/react-query/Queries";

const HeaderMenu = () => {
  const {
    user,
    setUser,
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
    setIsAuthenticated,
  } = useUserContext();

  const theme = useTheme();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { mutate: signOut } = useSignOutAccount();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async (e) => {
    handleClose();
    e.preventDefault();
    signOut();
    setIsAuthenticated(false); //
    setUser(INITIAL_USER);
    navigate("/login");
  };
  return (
    <Box
      sx={{
        backgroundColor: "black",
        px: 2,
        py: 1,
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
        zIndex: 3,
        alignItems: "center",
      }}
    >
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <MenuOutlined
          sx={{
            color: "#fff",
            display: { xs: "block", sm: "block", md: "none" },
          }}
        />
        <Box
          component={NavLink}
          to={"/"}
          display={{ xs: "flex", sm: "none", md: "none" }}
          alignItems={"center"}
        >
          <img
            src={reactLogo2}
            className="logo react"
            alt="React logo"
            height={5}
            color="#fff"
          />
        </Box>
        {Category.map((a) => (
          <Box
            key={a.id}
            className="link headerMenu"
            underline="none"
            alignItems={"center"}
            display={{ xs: "none", sm: "none", md: "flex" }}
            zIndex={4}
            textAlign={"left"}
          >
            <Typography className="headerMenuTitle">{a.name}</Typography>
            <KeyboardArrowDown fontSize="small" />
            <Box
              className="menuContent"
              display={"none"}
              position={"absolute"}
              top={30}
              pt={2}
              zIndex={1}
            >
              <Box className="arrow-up"></Box>
              <Box px={2} sx={{ backgroundColor: "#000" }}>
                {a.subCategory.map((b) => (
                  <Box key={b.name} className="headerSubMenu" py={1}>
                    <Typography className="headerSubMenuTitle">
                      {b.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {!isAuthenticated ? (
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography
            component={NavLink}
            sx={{ textDecoration: "none" }}
            to={"/login"}
            className="headerMenuTitle"
            color={"#b1b1b1"}
          >
            Login
          </Typography>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
            }}
            className="headerMenuTitle"
            onClick={() => navigate("/register")}
          >
            Signup
          </Button>
        </Box>
      ) : (
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Button
            startIcon={<PostAdd />}
            variant="text"
            onClick={() => navigate("/create-resource")}
            sx={{
              textTransform: "capitalize",
              color: "white",
            }}
            className="headerMenuTitle"
          >
            Create
          </Button>
          <Notifications color="inherit" sx={{ color: "#fff" }} />
          <Box
            display={"flex"}
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <Avatar
              src={
                user.avatar && `http://localhost:3307/avatars/${user.avatar}`
              }
              sx={{ width: 24, height: 24 }}
            />
            <ArrowDropDown sx={{ color: "#fff" }} />
          </Box>
        </Box>
      )}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        disableAutoFocusItem
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ border: "none" }}
          onClick={() => {
            handleClose();
            if (location.pathname !== "/profile/me") {
              navigate({
                pathname: `/profile/me`,
              });
            }
          }}
        >
          <Avatar
            src={user.avatar && `http://localhost:3307/avatars/${user.avatar}`}
            sx={{ width: "50px", height: "50px" }}
          />
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              {user?.name}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#777" }}>
              {user?.email}
            </Typography>
            <Typography
              sx={{ fontSize: "12px" }}
              color={theme.palette.primary.light}
            >
              Edit Profile
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ minWidth: 200 }}
          selected={location.pathname === `/author/${user.id}`}
          onClick={() => {
            handleClose();
            if (location.pathname !== `/author/${user.id}`) {
              navigate({
                pathname: `/author/${user.id}`,
              });
            }
          }}
        >
          <ListItemIcon>
            <Person2Outlined />
          </ListItemIcon>{" "}
          My Page
        </MenuItem>
        <MenuItem
          sx={{ minWidth: 200 }}
          selected={location.pathname === `/profile/favorites/${user.id}`}
          onClick={() => {
            handleClose();
            if (location.pathname !== `/profile/favorites/${user.id}`) {
              navigate({
                pathname: `/profile/favorites/${user.id}`,
              });
            }
          }}
        >
          <ListItemIcon>
            <FavoriteBorderOutlined />
          </ListItemIcon>{" "}
          Favorites
        </MenuItem>
        <MenuItem
          sx={{ minWidth: 200 }}
          selected={location.pathname === `/profile/downloads`}
          onClick={() => {
            handleClose();
            if (location.pathname !== "/profile/downloads") {
              navigate({
                pathname: `/profile/downloads`,
              });
            }
          }}
        >
          <ListItemIcon>
            <DownloadOutlined />
          </ListItemIcon>{" "}
          Downloads
          <ListItemSecondaryAction>
            <Tooltip title="Anda hanya bisa download 10 Asset per hari">
              <Chip size="small" label="1/10" />
            </Tooltip>
          </ListItemSecondaryAction>
        </MenuItem>
        <MenuItem
          sx={{ minWidth: 200 }}
          selected={location.pathname === `/profile/followings`}
          onClick={() => {
            handleClose();
            if (location.pathname !== "/profile/followings") {
              navigate({
                pathname: `/profile/followings`,
              });
            }
          }}
        >
          <ListItemIcon>
            <PeopleOutline />
          </ListItemIcon>{" "}
          Followings
        </MenuItem>
        <MenuItem
          sx={{ minWidth: 200 }}
          selected={location.pathname === `/profile/my-collections`}
          onClick={() => {
            handleClose();
            if (location.pathname !== "/profile/my-collections") {
              navigate({
                pathname: `/profile/my-collections`,
              });
            }
          }}
        >
          <ListItemIcon>
            <FolderOutlined />
          </ListItemIcon>{" "}
          My Collections
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ minWidth: 200 }}
          selected={location.pathname === `/profile/transactions`}
          onClick={() => {
            handleClose();
            if (location.pathname !== "/profile/transactions") {
              navigate({
                pathname: `/profile/transactions`,
              });
            }
          }}
        >
          <ListItemIcon>
            <ReceiptOutlined />
          </ListItemIcon>{" "}
          Transactions
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderMenu;
