import {
  Avatar,
  Box,
  Button,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import Category from "../data/Category.json";
import {
  ArrowDropDown,
  KeyboardArrowDown,
  Notifications,
} from "@mui/icons-material";
import MenuCategory from "../data/MenuCategory.json";

const FooterMenu = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(66, 66, 66, 0.5)",
        px: 2,
        py: 2,
        gap: 2,
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display={"flex"}
        sx={{
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          maxWidth: "87.5rem",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ textWrap: "nowrap" }}
          className="headerMenuTitle"
          color={"#b1b1b1"}
        >
          Wearstock Company projects
        </Typography>

        <Box width={"100%"} />

        <Box
          display={"flex"}
          sx={{
            gap: 2,
            width: "100%",
            textAlign: "center",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "right" },
          }}
        >
          {MenuCategory[3]?.page.map((a) => (
            <Box
              key={a.id}
              className="link headerMenu"
              underline="none"
              alignItems={"center"}
              display={"flex"}
              textAlign={"left"}
            >
              <Typography className="headerMenuTitle">{a.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FooterMenu;
