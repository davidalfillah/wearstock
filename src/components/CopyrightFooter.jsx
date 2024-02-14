import { Box, Button, Typography } from "@mui/material";
import React from "react";
import reactLogo from "../assets/logo2-white.svg";

const CopyrightFooter = () => {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        display: { sm: "block", md: "flex" },
        justifyContent: "center",
        borderTop: "2px solid rgba(66, 66, 66, 0.5)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: 2,
          maxWidth: "87.5rem",
          width: "100%",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={reactLogo}
          className="logoFooter react"
          alt="React logo"
          height={10}
          color="#fff"
        />
        <Typography
          className="headerMenuTitle"
          color={"rgba(156,156,156)"}
          sx={{ textWrap: { sm: "wrap", md: "nowrap" } }}
        >
          Copyright © 2010-2024 Wearstock Company S.L. All rights reserved.
        </Typography>
        <Box width={"100%"} />
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{
            textTransform: "capitalize",
            color: "white",
            paddingX: "30px !important",
            paddingY: "10px !important",
          }}
          className="headerMenuTitle"
        >
          Languages
        </Button>
      </Box>
    </Box>
  );
};

export default CopyrightFooter;
