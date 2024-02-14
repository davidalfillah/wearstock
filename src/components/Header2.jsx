import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Input,
  Link,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  MenuItem,
  MenuList,
  SvgIcon,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import logo1Light from "../assets/logo1-white.svg";
import logo2Light from "../assets/logo2-white.svg";
import logo1Dark from "../assets/logo1.svg";
import logo2Dark from "../assets/logo2.svg";
import React from "react";
import {
  ArrowDropDown,
  DownloadOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  FolderOutlined,
  InfoOutlined,
  KeyboardArrowDown,
  List,
  Logout,
  MenuRounded,
  Notifications,
  PeopleOutline,
  Person2Outlined,
  PersonAdd,
  PostAdd,
  ReceiptOutlined,
  Settings,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import Category from "../data/Category.json";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext, INITIAL_USER } from "../contexts/AuthContext";
import { useSignOutAccount } from "../libs/react-query/Queries";

const Header2 = (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
    setIsAuthenticated,
  } = useUserContext();

  const theme = useTheme();

  const reactLogo = props.isDark ? logo1Dark : logo1Light;
  const reactLogo2 = props.isDark ? logo2Dark : logo2Light;

  const navigate = useNavigate();
  const location = useLocation();
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
    e.preventDefault();
    signOut();
    setIsAuthenticated(false); //
    setUser(INITIAL_USER);
    navigate("/login");
  };
  return (
    <Box
      bgcolor={props.background}
      display={"flex"}
      justifyContent={"center"}
      sx={{
        position: "sticky",
        paddingX: { xs: 1, sm: 1, md: 2, lg: 2 },
        zIndex: 10,
        top: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "62px",
          maxWidth: "87.5rem",
          justifyContent: "space-between",
        }}
      >
        <Box display={"flex"} alignItems={"center"} flex={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component={NavLink}
              to={"/"}
              display={{ xs: "none", sm: "none", lg: "block" }}
            >
              <img
                src={reactLogo}
                className="logo react"
                alt="React logo"
                height={5}
                color={props.text}
              />
            </Box>
            <Box
              component={NavLink}
              to={"/"}
              display={{ xs: "none", sm: "none", md: "block", lg: "none" }}
            >
              <img
                src={reactLogo2}
                className="logo react"
                alt="React logo"
                height={5}
                color={props.text}
              />
            </Box>
            <IconButton
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
              }}
            >
              <MenuRounded
                sx={{
                  color: props.text,
                }}
              />
            </IconButton>
            <Box display={{ xs: "none", sm: "none", md: "flex" }} gap={2}>
              {Category.map((a) => (
                <Box
                  key={a.id}
                  className="link headerMenu1"
                  underline="none"
                  alignItems={"center"}
                  display={"flex"}
                  textAlign={"left"}
                >
                  <Typography className="headerMenuTitle" color={props.text}>
                    {a.name}
                  </Typography>
                  <KeyboardArrowDown
                    fontSize="small"
                    sx={{ color: props.text }}
                  />
                  <Box
                    className="menuContent"
                    display={"none"}
                    position={"absolute"}
                    top={30}
                    pt={2}
                    zIndex={2}
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
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flex={1}
            sx={{
              button: {
                flex: "none",
              },

              paddingX: { xs: 1, sm: 2, md: 2, lg: 0 },
            }}
            justifyContent={"end"}
            gap={1}
          >
            {!isAuthenticated && (
              <>
                <Typography
                  onClick={() => navigate("/login")}
                  className="headerMenuTitle"
                  sx={{ cursor: "pointer" }}
                  color={props.text}
                >
                  Login
                </Typography>
                <Button
                  onClick={() => navigate("/register")}
                  variant="outlined"
                  color="inherit"
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                  }}
                  className="headerMenuTitle"
                >
                  Signup
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button
                  startIcon={<PostAdd />}
                  onClick={() => navigate("/create-resource")}
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                  }}
                  className="headerMenuTitle"
                  color="info"
                >
                  Create
                </Button>
                <IconButton>
                  <Notifications color="inherit" sx={{ color: props.text }} />
                </IconButton>
                <Box
                  display={"flex"}
                  sx={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  <Avatar
                    src={
                      user.avatar &&
                      `http://localhost:3307/avatars/${user.avatar}`
                    }
                    sx={{ width: 24, height: 24 }}
                  />
                  <ArrowDropDown sx={{ color: props.text }} />
                </Box>
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
                      src={
                        user.avatar &&
                        `http://localhost:3307/avatars/${user.avatar}`
                      }
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
                    selected={
                      location.pathname === `/profile/favorites/${user.id}`
                    }
                    onClick={() => {
                      handleClose();
                      if (
                        location.pathname !== `/profile/favorites/${user.id}`
                      ) {
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
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header2;
