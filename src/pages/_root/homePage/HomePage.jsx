import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Header2 from "../../../components/Header2";
import Hero1 from "../../../components/Hero1";

const HomePage = () => {
  return (
    <Box>
      <Header2 background={"#2196f3"} text={"#fff"} isDark={false} />
      <Hero1 />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        flexDirection={"column"}
      >
        <Box
          px={2}
          sx={{
            maxWidth: "87.5rem",
          }}
        >
          <Typography>lorem</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
