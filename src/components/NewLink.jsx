import { ArrowDropDown, Facebook, Instagram, X } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const NewLink = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [age, setAge] = React.useState("");
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    props.setTitle(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box
      display={"flex"}
      p={1}
      borderRadius={10}
      alignItems={"center"}
      border={"1px solid #d8d8d8"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        borderRadius={5}
        px={2}
        onClick={(e) => handleOpen(e)}
        py={1}
        gap={1}
        bgcolor={"rgba(0,0,0,0.1)"}
      >
        {
          {
            Twitter: <X fontSize="small" />,
            Facebook: <Facebook fontSize="small" />,
            Instagram: <Instagram fontSize="small" />,
          }[props.title]
        }
        <Typography display={{ xs: "none", sm: "block" }}>
          {
            {
              "": "Select",
              Twitter: "Twitter",
              Facebook: "Facebook",
              Instagram: "Instagram",
            }[props.title]
          }
        </Typography>
        <ArrowDropDown />
      </Box>

      <FormControl sx={{ m: 1 }}>
        <InputBase
          label="Username"
          placeholder="Username"
          onChange={(e) => props.setInput(e.target.value)}
        />
      </FormControl>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleChange("");
            handleClose();
          }}
        >
          None
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange("Twitter");
            handleClose();
          }}
        >
          Twitter
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange("Facebook");
            handleClose();
          }}
        >
          Facebook
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange("Instagram");
            handleClose();
          }}
        >
          Instagram
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NewLink;
