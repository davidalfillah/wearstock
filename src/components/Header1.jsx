import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Link,
  Typography,
} from "@mui/material";
import reactLogo from "../assets/logo1.svg";
import reactLogo2 from "../assets/logo2.svg";
import React, { useEffect } from "react";
import {
  Close,
  Folder,
  FolderOutlined,
  Notifications,
  Search,
  Settings,
  Tune,
  X,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Header1 = ({ props }) => {
  const [search, setSearch] = React.useState("");
  const onSubmit = () => {
    props.handleSearch(search);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (search !== "") {
        onSubmit();
      }
    }
  };
  useEffect(() => {
    if (props?.params.title) {
      setSearch(props?.params.title?.toLowerCase().split("-").join(" "));
    }
  }, [props?.params]);
  return (
    <Box
      sx={{
        top: 0,
        position: "sticky",
        borderBottom: 1,
        backgroundColor: "white",
        borderColor: "#d8d8d8",
        display: "flex",
        padding: 1.5,
        alignItems: "center",
        gap: 1,
        zIndex: 10,
      }}
    >
      <Box
        component={NavLink}
        to={"/"}
        display={{ xs: "none", sm: "none", lg: "flex" }}
      >
        <img
          src={reactLogo}
          className="logo react"
          alt="React logo"
          height={5}
          color="#fff"
        />
      </Box>
      <Box
        component={NavLink}
        to={"/"}
        display={{ xs: "none", sm: "flex", md: "flex", lg: "none" }}
      >
        <img
          src={reactLogo2}
          className="logo react"
          alt="React logo"
          height={5}
          color="#fff"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#e7e7e7",
          width: "100%",
          borderRadius: 5,
          height: 45,
          border: "1px solid #d8d8d8",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          display={"flex"}
          width={"100%"}
          padding={1}
          paddingX={2}
          height={30}
        >
          <input
            type="text"
            id="searchBar"
            onKeyDown={handleKeyDown}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{
              background: "none",
              fontSize: 15,
              border: 0,
              outline: "none",
              width: "100%",
            }}
          />
        </Box>
        {search && (
          <IconButton onClick={() => setSearch("")}>
            <Close />
          </IconButton>
        )}
        <Box
          sx={{
            marginLeft: 1,
            height: "100%",
            borderRight: "1px solid #d8d8d8",
          }}
        />
        <Button
          color="primary"
          onClick={onSubmit}
          sx={{
            height: "100%",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 0,
            paddingX: 5,
            gap: 1,
            outline: "none",
            color: "#000",
            textTransform: "capitalize",
          }}
          variant="text"
          disableElevation
        >
          <Search fontSize="medium" color="#777" /> Search
        </Button>
      </Box>
      <Button
        variant="outlined"
        size="large"
        sx={{
          display: "none",
          textTransform: "capitalize",
          textWrap: "nowrap",
          gap: 1,
          paddingX: 4,
          paddingY: 1,
          borderRadius: 10,
          height: 45,
          color: "#000",
          backgroundColor: "#e7e7e7",
          border: "1px solid #d8d8d8",
          fontWeight: "600 !important",
        }}
      >
        <FolderOutlined /> <Typography>My Collections</Typography>
      </Button>
      {location.pathname === "/search" && (
        <Button
          onClick={props.handleFilterPanelRight}
          variant="outlined"
          size="large"
          sx={{
            textTransform: "capitalize",
            textWrap: "nowrap",
            display: { md: "block", lg: "none" },
            gap: 1,
            paddingX: 2,
            paddingY: 1,
            borderRadius: 10,
            height: 45,
            color: "#000",
            backgroundColor: "#e7e7e7",
            border: "1px solid #d8d8d8",
            fontWeight: "600 !important",
          }}
        >
          <Tune />
        </Button>
      )}
    </Box>
  );
};

export default Header1;
